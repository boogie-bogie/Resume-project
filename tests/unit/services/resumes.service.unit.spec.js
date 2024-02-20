const ResumesService = require("../../../services/resuems.service");

// Mocked data
const newResume = require("../../data/new-resume.data.json");
const allResumes = require("../../data/all-resumes.data.json");

/** Service 테스트 케이스 작성 패턴
 * beforeEach() 
    - 모킹한 Repository 메서드를 jest.fn()로 대체
    - 모킹한 Repository 인스턴스 생성
 * afterEach()
    - 각 테스트 종료시 모킹 초기화
 * describe('Test Case 1')
 * ㄴ it('테스트')
 *   Mocking - jest.fn()로 모킹한 Repository 메서드 정의
 *   Call - 매개변수 정의, Repository 메서드 호출
 *   expect(Mockfn) - matcher(Times/CalledWith/Equal)
 * ㄴ it('에러 처리')
 *   Mocking, Call은 동일
 *   expect(rejectedPromise).rejects.toThrow('errorMessage')
*/

describe("ResumesService", () => {
  let resumesService;
  let repoMocks;

  beforeEach(() => {
    repoMocks = {
      getAllResumes: jest.fn(),
      getResumeById: jest.fn(),
      createResume: jest.fn(),
      updateResume: jest.fn(),
      deleteResume: jest.fn(),
    };
    resumesService = new ResumesService(repoMocks);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllResumes", () => {
    it("이력서 목록(allResumes)를 반환해야함.", async () => {
      // Mocking - Repo. Method
      repoMocks.getAllResumes.mockResolvedValue(allResumes);

      // Call - 매개변수 정의, Repository 메서드 호출
      const retrievedResumes = await resumesService.getAllResumes(
        "createdAt",
        "desc",
      );

      // expect - matcher
      expect(repoMocks.getAllResumes).toHaveBeenCalledTimes(1);
      expect(repoMocks.getAllResumes).toHaveBeenCalledWith("createdAt", "desc");
      expect(retrievedResumes).toEqual(allResumes);
    });
  });

  describe("getResumeById", () => {
    it("특정 id 값으로 단건의 이력서(newResume)를 검색하여 반환해야함.", async () => {
      // Mocking - Repo. Method
      const resumeId = 4; // newResume resumeId: 4
      repoMocks.getResumeById.mockResolvedValue(newResume);

      // Call - Repository 메서드 호출
      const retrievedResume = await resumesService.getResumeById(resumeId);

      // expect - matcher
      expect(repoMocks.getResumeById).toHaveBeenCalledTimes(1);
      expect(repoMocks.getResumeById).toHaveBeenCalledWith(resumeId);
      expect(retrievedResume).toEqual(newResume);
    });

    it("특정 id 값의 이력서가 존재하지 않으면, 에러 메세지를 반환해야함.", async () => {
      // Mocking - Repo. Method
      repoMocks.getResumeById.mockRejectedValue(
        new Error("존재하지 않는 이력서입니다."),
      );

      // Call - Repository 메서드 호출
      // 존재하지 않는 100번 resumeId
      const rejectedPromise = resumesService.getResumeById(100);

      // expect - matcher
      await expect(rejectedPromise).rejects.toThrow(
        "존재하지 않는 이력서입니다.",
      );
    });
  });

  describe("createResume", () => {
    it("3개의 매개변수를 전달 받아서 생성된 이력서를 반환해야함.", async () => {
      // Mocking - Repo. Method
      const title = "새로운 이력서";
      const content = "내용";
      const userId = 1;
      repoMocks.createResume.mockResolvedValue(newResume);

      // Call - Repository 메서드 호출
      const createdResume = await resumesService.createResume(
        title,
        content,
        userId,
      );

      // expect - matcher
      expect(repoMocks.createResume).toHaveBeenCalledTimes(1);
      expect(repoMocks.createResume).toHaveBeenCalledWith(
        title,
        content,
        userId,
      );
      expect(createdResume).toEqual(newResume);
    });
  });

  describe("updateResume", () => {
    it("특정 id값의 이력서가 존재하면, 이력서를 수정하여 반환해야함.", async () => {
      // Mocking - Repo. Method
      const user = { userId: 1 };
      const resumeId = 4;
      const title = "수정된 제목";
      const content = "수정된 내용";
      const status = "수정된 지원 상태";
      const sampleResume = { id: resumeId, title, content, status };
      repoMocks.getResumeById.mockResolvedValue(sampleResume);
      repoMocks.updateResume.mockResolvedValue(sampleResume);

      // Call - Service 메서드 호출
      const updatedResume = await resumesService.updateResume(
        user,
        resumeId,
        title,
        content,
        status,
      );

      // expect - matcher
      expect(repoMocks.getResumeById).toHaveBeenCalledTimes(1);
      expect(repoMocks.getResumeById).toHaveBeenCalledWith(resumeId);
      expect(repoMocks.updateResume).toHaveBeenCalledTimes(1);
      expect(repoMocks.updateResume).toHaveBeenCalledWith(
        resumeId,
        title,
        content,
        status,
      );
      expect(updatedResume).toEqual(sampleResume);
    });

    it("특정 id값의 이력서가 존재하지 않으면, 에러 메세지를 반환해야함.", async () => {
      // Mocking - Repo. Method
      const user = { userId: 1 };
      const resumeId = 4;
      const title = "수정된 제목";
      const content = "수정된 내용";
      const status = "수정된 지원 상태";
      repoMocks.getResumeById.mockResolvedValue(null);

      // Call - Service 메서드 호출
      const rejectedPromise = resumesService.updateResume(
        user,
        resumeId,
        title,
        content,
        status,
      );

      // expect - matcher
      await expect(rejectedPromise).rejects.toThrow(
        "존재하지 않는 이력서입니다.",
      );
      expect(repoMocks.getResumeById).toHaveBeenCalledTimes(1);
      expect(repoMocks.getResumeById).toHaveBeenCalledWith(resumeId);
      expect(repoMocks.updateResume).not.toHaveBeenCalled();
    });
  });

  describe("deleteResume", () => {
    it("특정 id값의 이력서가 존재하면, 이력서를 삭제하여 반환해야함.", async () => {
      // Mocking - Repo. Method
      const user = { userId: 1 };
      const resumeId = 4;
      const sampleResume = { id: resumeId };
      repoMocks.getResumeById.mockResolvedValue(sampleResume);
      repoMocks.deleteResume.mockResolvedValue(true);

      // Call - Service 메서드 호출
      const deletedResume = await resumesService.deleteResume(user, resumeId);

      // expect - matcher
      expect(repoMocks.getResumeById).toHaveBeenCalledTimes(1);
      expect(repoMocks.getResumeById).toHaveBeenCalledWith(resumeId);
      expect(repoMocks.deleteResume).toHaveBeenCalledTimes(1);
      expect(repoMocks.deleteResume).toHaveBeenCalledWith(resumeId);
      expect(deletedResume).toBeTruthy();
    });

    it("특정 id값의 이력서가 존재하지 않으면, 에러 메세지를 반환해야함.", async () => {
      // Mocking - Repo. Method
      const user = { userId: 1 };
      const resumeId = 4;
      repoMocks.getResumeById.mockResolvedValue(null);

      // Call - Service 메서드 호출
      const rejectedPromise = resumesService.deleteResume(user, resumeId);

      // expect - matcher
      await expect(rejectedPromise).rejects.toThrow(
        "존재하지 않는 이력서입니다.",
      );
      expect(repoMocks.getResumeById).toHaveBeenCalledTimes(1);
      expect(repoMocks.getResumeById).toHaveBeenCalledWith(resumeId);
      expect(repoMocks.deleteResume).not.toHaveBeenCalled();
    });
  });
});

// Mocking - Repo. Method
// Call - Repository 메서드 호출
// expect - matcher
