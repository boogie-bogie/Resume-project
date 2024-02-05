const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Resume API Project",
    description: "이력서 API Swagger 문서입니다.",
  },
  host: "localhost:3000",
};

const outputFile = "./swagger-output.json";
const routes = ["./routers/users.router.js", "./routers/resumes.router.js"];

swaggerAutogen(outputFile, routes, doc).then(() => {
  require("./app.js");
});
