const userModel = require("../prisma/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/** 사용자 회원가입 API */
exports.createUser = async (req, res, next) => {
  const { email, password, pwMatch, name, age, gender, profileImage } =
    req.body;
  const isExistUser = await userModel.users.findFirst({
    where: {
      email,
    },
  });
  if (isExistUser) {
    return res
      .status(400)
      .json({ errorMessage: "이미 존재하는 이메일입니다." });
  }
  if (!(password.length >= 6)) {
    return res
      .status(400)
      .json({ errorMessage: "비밀번호는 6자리 이상이어야 합니다." });
  }
  if (password !== pwMatch)
    return res.status(400).json({
      errorMessage: "'비밀번호'와 '비밀번호 확인'이 일치하지 않습니다.",
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.users.create({
    data: { email, password: hashedPassword, name },
  });

  return res.status(201).json({ email: user.email, name: user.name });
};

/** 사용자 로그인 API */
exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const isExistUser = await userModel.users.findFirst({
    where: {
      email,
    },
  });
  if (!isExistUser) {
    return res
      .status(408)
      .json({ errorMessage: "존재하지 않는 이메일입니다." });
  }
  if (!(await bcrypt.compare(password, isExistUser.password))) {
    return res
      .status(408)
      .json({ errorMessage: "비밀번호가 일치하지 않습니다." });
  }

  const accessToken = jwt.sign(
    {
      userId: isExistUser.userId,
    },
    process.env.JWT_ACCESS_SECRET_KEY,
    { expiresIn: "12h" },
  );

  return res.json({ accessToken });
};

/** 내 정보 조회  */
exports.getMyInfos = (req, res, next) => {
  const user = req.user;
  return res.json({
    email: user.email,
    name: user.name,
  });
};
