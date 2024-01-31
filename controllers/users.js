const userModel = require("../prisma/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/** 사용자 회원가입 API */
exports.createUser = async (req, res, next) => {
  const { email, password, name, age, gender, profileImage } = req.body;
  const isExistUser = await userModel.users.findFirst({
    where: {
      email,
    },
  });
  if (isExistUser) {
    return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
  }
  if (!(password.length >= 6)) {
    return res
      .status(409)
      .json({ message: "비밀번호는 6자리 이상이어야 합니다." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.users.create({
    data: { email, password: hashedPassword },
  });
  const userInfo = await userModel.userInfos.create({
    data: {
      userId: user.userId,
      name,
      age,
      gender: gender.toUpperCase(),
      profileImage,
    },
  });

  return res.status(201).json({ userInfo });
};

exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const isExistUser = await userModel.users.findFirst({
    where: {
      email,
    },
  });
  if (!isExistUser) {
    return res.status(408).json({ message: "존재하지 않는 이메일입니다." });
  }
  if (!(await bcrypt.compare(password, isExistUser.password))) {
    return res.status(408).json({ message: "비밀번호가 일치하지 않습니다." });
  }
  const token = jwt.sign(
    {
      userId: isExistUser.userId,
    },
    "user-secret-key",
    { expireIN: "12h " },
  );

  res.cookie("authorization", `Bearer ${token}`);
  return res.status(200).json({ message: "로그인에 성공하였습니다.😄" });
};

exports.getUsers = async (req, res, next) => {
  return res.json({ message: "getUsers.😄" });
};
