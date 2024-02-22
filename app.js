const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandlerMiddleware = require("./middlewares/errorhandler.Middleware");
const { apiTimeCheck } = require("./middlewares/api-time-check");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());

/** 라우터 모듈 마운트 */
const router = express.Router();
const userRoutes = require("./routers/users.router");
const resumeRoutes = require("./routers/resumes.router");

app.use(apiTimeCheck);
app.use("/api", router);
app.use("/api", userRoutes);
app.use("/api", resumeRoutes);

router.get("/", (req, res) => {
  return res.json({ message: "안녕하세요.😄" });
});

/** 스웨거 경로 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(
    PORT,
    "번 포트로 서버가 열렸어요! API 명세서: http://localhost:3000/api-docs",
  );
});
