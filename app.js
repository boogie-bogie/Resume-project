const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandlerMiddleware = require("./middlewares/errorhandler.Middleware");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());

/** 라우터 모듈 마운트 */
const router = express.Router();
const userRoutes = require("./routers/users.router");
const resumeRoutes = require("./routers/resumes.router");

app.use("/api", [router, userRoutes, resumeRoutes]);

router.get("/", (req, res) => {
  return res.json({ message: "안녕하세요.😄" });
});
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(
    PORT,
    "번 포트로 서버가 열렸어요! API 명세서: http://localhost:3000/api-docs",
  );
});
