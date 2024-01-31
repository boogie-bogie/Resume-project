const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: "안녕하세요.😄" });
});

app.listen(PORT, () => {
  console.log(
    PORT,
    "번 포트로 서버가 열렸어요! API 명세서: http://localhost:3000/api-docs",
  );
});
