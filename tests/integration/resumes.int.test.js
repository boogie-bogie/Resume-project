const request = require("supertest");
const app = require("../../app.js");

//테스트용 데이터 가져오기
const newResume = require("../data/new-resume.data.json");

describe("POST integration test", () => {
  it("이력서 생성 POST /api/resumes", async () => {
    const res = await request(app).post("/api/resumes").send(newResume);
    console.group("오류 그룹");
    console.log(newResume);
    console.groupEnd();
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(newResume.title);
    expect(res.body.content).toBe(newResume.content);
  });
});
