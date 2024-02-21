const ResumesController = require("../../../controllers/resumes.controller");
const ResumesService = require("../../../services/resuems.service");
const httpMocks = require("node-mocks-http");

describe("ResumesController", () => {
  let resumesController;
  let serviceMocks;
  let req, res, next;

  beforeEach(() => {
    serviceMocks = {
      getAllResumes: jest.fn(),
      getResumeById: jest.fn(),
      createResume: jest.fn(),
      updateResume: jest.fn(),
      deleteResume: jest.fn(),
    };
    resumesController = new ResumesController(serviceMocks);
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllResumes", () => {
    beforeEach(() => {
      req.query = { orderKey: "resumeId", orderValue: "desc" };
    });

    it("orderKey와 orderValue를 기준으로 정렬된 모든 이력서 목록을 검색하여 반환해야함.", async () => {
      const resumes = [
        { id: 1, title: "이력서 1" },
        { id: 2, title: "이력서 2" },
      ];
      serviceMocks.getAllResumes.mockResolvedValue(resumes);
      await resumesController.getAllResumes(req, res, next);
      expect(serviceMocks.getAllResumes).toHaveBeenCalledWith(
        "resumeId",
        "desc",
      );
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ data: resumes });
    });

    it("에러가 발생하면 next 함수 호출과 함께 에러를 반환해야함.", async () => {
      const errorMessage = "서버 내부 에러가 발생했습니다.";
      serviceMocks.getAllResumes.mockRejectedValue(new Error(errorMessage));
      await resumesController.getAllResumes(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error(errorMessage));
    });

    it("올바르지 않은 orderKey를 입력했을 때, 에러를 반환해야 함", async () => {
      req.query = { orderKey: "잘못된 키", orderValue: "desc" };
      await resumesController.getAllResumes(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new Error("orderKey 가 올바르지 않습니다."),
      );
    });

    it("올바르지 않은 orderValue를 입력했을 때, 에러를 반환해야 함", async () => {
      req.query = { orderKey: "resumeId", orderValue: "잘못된 값" };
      await resumesController.getAllResumes(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new Error("orderValue 가 올바르지 않습니다."),
      );
    });
  });

  describe("getResumeById", () => {
    beforeEach(() => {
      req.params.resumeId = 1;
    });

    it("특정 id값으로 단건의 이력서를 검색하여 반환해야함.", async () => {
      const resume = { id: 1, title: "이력서 1" };
      serviceMocks.getResumeById.mockResolvedValue(resume);
      await resumesController.getResumeById(req, res, next);
      expect(serviceMocks.getResumeById).toHaveBeenCalledWith(1);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ data: resume });
    });

    it("에러가 발생하면 next 함수 호출과 함께 에러를 반환해야함.", async () => {
      const errorMessage = "서버 내부 에러가 발생했습니다.";
      serviceMocks.getResumeById.mockRejectedValue(new Error(errorMessage));
      await resumesController.getResumeById(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error(errorMessage));
    });

    it("resumeId를 입력하지 않으면, 에러를 반환해야 함", async () => {
      req.params.resumeId = null;
      await resumesController.getResumeById(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error("resumeId는 필수값입니다."));
    });
  });

  describe("createResume", () => {
    beforeEach(() => {
      req.user = { userId: 1 };
      req.body = { title: "새로운 이력서", content: "내용" };
    });

    it("새로 생성한 이력서를 반환해야 함", async () => {
      const createdResume = { id: 3, title: "새로운 이력서" };
      serviceMocks.createResume.mockResolvedValue(createdResume);
      await resumesController.createResume(req, res, next);
      expect(serviceMocks.createResume).toHaveBeenCalledWith(
        "새로운 이력서",
        "내용",
        1,
      );
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({
        message: "이력서가 생성되었습니다.😄",
        data: createdResume,
      });
    });

    it("에러가 발생하면 next 함수 호출과 함께 에러를 반환해야함.", async () => {
      const errorMessage = "서버 내부 에러가 발생했습니다.";
      serviceMocks.createResume.mockRejectedValue(new Error(errorMessage));
      await resumesController.createResume(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error(errorMessage));
    });

    it("이력서 제목을 입력하지 않으면, 에러를 반환해야 함", async () => {
      req.body = { content: "내용" };
      await resumesController.createResume(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new Error("이력서 제목은 필수 항목입니다."),
      );
    });

    it("자기소개를 입력하지 않으면, 에러를 반환해야 함", async () => {
      req.body = { title: "새로운 이력서" };
      await resumesController.createResume(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new Error("자기소개는 필수 항목입니다."),
      );
    });
  });

  describe("updateResume", () => {
    beforeEach(() => {
      req.user = { userId: 1 };
      req.params.resumeId = 1;
      req.body = {
        title: "수정된 제목",
        content: "수정된 내용",
        status: "PASS",
      };
    });

    it("특정 id값의 이력서를 수정하고 수정된 이력서를 반환해야 함", async () => {
      const updatedResume = {
        id: 1,
        title: "수정된 제목",
        content: "수정된 내용",
        status: "PASS",
      };
      serviceMocks.updateResume.mockResolvedValue(updatedResume);
      await resumesController.updateResume(req, res, next);
      expect(serviceMocks.updateResume).toHaveBeenCalledWith(
        req.user,
        1,
        "수정된 제목",
        "수정된 내용",
        "PASS",
      );
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({
        message: "이력서가 성공적으로 업데이트되었습니다.😄",
        data: updatedResume,
      });
    });

    it("에러가 발생하면 next 함수 호출과 함께 에러를 반환해야함.", async () => {
      const errorMessage = "서버 내부 에러가 발생했습니다.";
      serviceMocks.updateResume.mockRejectedValue(new Error(errorMessage));
      await resumesController.updateResume(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error(errorMessage));
    });

    it("resumeId를 입력하지 않으면, 에러를 반환해야 함", async () => {
      req.params.resumeId = null;
      await resumesController.updateResume(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error("resumeId는 필수값입니다."));
    });

    it("이력서 제목을 입력하지 않으면, 에러를 반환해야 함", async () => {
      req.body.title = null;
      await resumesController.updateResume(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new Error("이력서 제목은 필수 항목입니다."),
      );
    });

    it("자기소개를 입력하지 않으면, 에러를 반환해야 함", async () => {
      req.body.content = null;
      await resumesController.updateResume(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new Error("자기소개는 필수 항목입니다."),
      );
    });

    it("지원 상태를 입력하지 않으면, 에러를 반환해야 함", async () => {
      req.body.status = null;
      await resumesController.updateResume(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new Error("지원 상태는 필수 항목입니다."),
      );
    });

    it("올바르지 않은 지원 상태가 입력되면 에러를 반환해야 함", async () => {
      req.body.status = "미포함 지원 상태";
      await resumesController.updateResume(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new Error(
          "올바르지 않은 상태값입니다. 지원 상태는 'APPLY', 'DROP', 'PASS', 'INTERVIEW1', 'INTERVIEW2', 'FINAL_PASS' 중 하나의 항목만 기재하실 수 있습니다. ",
        ),
      );
    });
  });

  describe("deleteResume", () => {
    beforeEach(() => {
      req.user = { userId: 1 };
      req.params.resumeId = 1;
    });

    it("특정 id값의 이력서를 삭제하고 삭제된 이력서를 반환해야 함", async () => {
      const deletedResume = { id: 1, title: "삭제된 이력서" };
      serviceMocks.deleteResume.mockResolvedValue(deletedResume);
      await resumesController.deleteResume(req, res, next);
      expect(serviceMocks.deleteResume).toHaveBeenCalledWith(req.user, 1);
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({
        message: "이력서가 삭제되었습니다. 😄",
        data: deletedResume,
      });
    });

    it("에러가 발생하면 next 함수 호출과 함께 에러를 반환해야함.", async () => {
      const errorMessage = "서버 내부 에러가 발생했습니다.";
      serviceMocks.deleteResume.mockRejectedValue(new Error(errorMessage));
      await resumesController.deleteResume(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error(errorMessage));
    });

    it("resumeId를 입력하지 않으면, 에러를 반환해야 함", async () => {
      req.params.resumeId = null;
      await resumesController.updateResume(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error("resumeId는 필수값입니다."));
    });
  });
});
