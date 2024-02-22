const ResumesRepository = require("../../../src/repositories/resumes.repository");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// Mocked data
const newResume = require("../../data/new-resume.data.json");
const allResumes = require("../../data/all-resumes.data.json");

/** Repository 테스트 케이스 작성 패턴
 * beforAll()
 * afterAll()
 * describe('Test Case 1')
 *  it
 *   Mocking - jest.spyOn().mockResolvedValue(sampleData)
 *   Call - 매개변수 정의, Prisma 메서드 호출
 *   expect(Mockfn) - matcher(Times/CalledWith/Equal)
 *   Restore - Mockfn.mockRestore()
 */
describe("ResumesRepository", () => {
  let resumesRepository;
  // redisClient는 null
  beforeAll(() => {
    resumesRepository = new ResumesRepository(prisma, null);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("getAllResumes", () => {
    it("이력서 생성일 기준으로 내림차순 정렬이 적용된 이력서 목록(allResumes)을 검색하여 반환해야함.", async () => {
      // Mocking - Prisma findMany 메서드

      const findManyMock = jest
        .spyOn(resumesRepository.prisma.resumes, "findMany")
        .mockResolvedValue(allResumes);

      // Call - 메서드 호출
      const retrievedResumes = await resumesRepository.getAllResumes(
        "createdAt",
        "desc",
      );

      // expect - matcher
      expect(findManyMock).toHaveBeenCalledTimes(1);
      expect(findManyMock).toHaveBeenCalledWith({
        select: {
          resumeId: true,
          title: true,
          content: true,
          status: true,
          user: {
            select: {
              name: true,
            },
          },
          createdAt: true,
        },
        orderBy: [{ createdAt: "desc" }],
      });
      expect(retrievedResumes).toEqual(allResumes);
      // expect(retrievedResumes).toBeDefined();

      // Restore
      findManyMock.mockRestore();
    });
  });

  describe("getResumeById", () => {
    it("특정 id 값으로 단건의 이력서(newResume)를 검색하여 반환해야함.", async () => {
      // Mocking - Prisma findFirst 메서드
      const findFirstMock = jest
        .spyOn(resumesRepository.prisma.resumes, "findFirst")
        .mockResolvedValue(newResume);

      // Call - 매개변수 정의, 메서드 호출
      const resumeId = 4; // newResume resumeId: 4
      const retrievedResume = await resumesRepository.getResumeById(resumeId);

      // expect - matcher
      expect(findFirstMock).toHaveBeenCalledTimes(1);
      expect(findFirstMock).toHaveBeenCalledWith({
        where: {
          resumeId: +resumeId,
        },
        select: {
          resumeId: true,
          title: true,
          content: true,
          user: {
            select: {
              name: true,
            },
          },
          createdAt: true,
        },
      });
      expect(retrievedResume).toEqual(newResume);

      // Restore
      findFirstMock.mockRestore();
    });
  });

  describe("createResume", () => {
    it("3개의 매개변수를 전달 받아서 생성된 이력서를 반환해야함.", async () => {
      // Mocking - Prisma create 메서드
      const createMock = jest
        .spyOn(resumesRepository.prisma.resumes, "create")
        .mockResolvedValue(newResume);

      // Call - 매개변수 정의, 메서드 호출
      const title = "새로운 이력서";
      const content = "내용";
      const userId = 1;
      const createdResume = await resumesRepository.createResume(
        title,
        content,
        userId,
      );

      // expect - matcher
      expect(createMock).toHaveBeenCalledTimes(1);
      expect(createMock).toHaveBeenCalledWith({
        data: {
          title,
          content,
          status: "APPLY",
          userId,
        },
      });
      expect(createdResume).toEqual(newResume);

      // Restore
      createMock.mockRestore();
    });
  });

  describe("updateResume", () => {
    it("4개의 매개변수를 전달 받아서 수정된 이력서를 반환해야함.", async () => {
      // Mocking - Prisma update 메서드
      const updateMock = jest
        .spyOn(resumesRepository.prisma.resumes, "update")
        .mockResolvedValue(newResume);

      // Call - 매개변수 정의, 메서드 호출
      const resumeId = 4; // newResume resumeId:4
      const title = "[서류합격] 매일 성장하는 이경복님.";
      const content = "서류 전형에 합격하셨습니다!";
      const status = "PASS";
      const updatedResume = await resumesRepository.updateResume(
        resumeId,
        title,
        content,
        status,
      );

      // expect - matcher
      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(updateMock).toHaveBeenCalledWith({
        where: {
          resumeId: +resumeId,
        },
        data: {
          title,
          content,
          status,
        },
      });
      expect(updatedResume).toEqual(newResume);

      // Restore
      updateMock.mockRestore();
    });
  });

  describe("deleteResume", () => {
    it("특정 id 값으로 삭제한 이력서(newResume)를 반환해야함.", async () => {
      // Mocking - Prisma delete 메서드
      const deleteMock = jest
        .spyOn(resumesRepository.prisma.resumes, "delete")
        .mockResolvedValue(newResume);

      // Call - 매개변수 정의, 메서드 호출
      const resumeId = 4; // newResume resumeId:4
      const deletedResume = await resumesRepository.deleteResume(resumeId);

      // expect - matcher
      expect(deleteMock).toHaveBeenCalledTimes(1);
      expect(deleteMock).toHaveBeenCalledWith({
        where: {
          resumeId: +resumeId,
        },
      });
      expect(deletedResume).toEqual(newResume);

      // Restore
      deleteMock.mockRestore();
    });
  });
});
