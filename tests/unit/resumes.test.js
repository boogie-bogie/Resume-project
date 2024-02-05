const resumeController = require("../../controllers/resumes");
const resumeModel = require("../../prisma/index");
const httpMocks = require("node-mocks-http");

describe("Resume Controller Create", () => {
  it("필수 항목(title, content)을 입력하지 않으면, 400번 코드와 에러 메세지를 반환해야함.", async () => {
    const userId = "1";
    const req = httpMocks.createRequest({
      user: { userId: +userId },
      body: {
        // title: "테스트 제목",
        content: "테스트 자기소개.",
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await resumeController.createResume(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toStrictEqual({
      success: false,
      message: "이력서 제목은 필수 항목입니다.",
    });
  });

  it("정상으로 생성되면, 201번 코드와 성공 메세지를 반환해야함.", async () => {
    const userId = "1";
    const req = httpMocks.createRequest({
      user: { userId: +userId },
      body: {
        title: "테스트 제목",
        content: "테스트 자기소개.",
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await resumeController.createResume(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toStrictEqual({
      message: "이력서가 생성되었습니다.😄",
    });
  });
});
