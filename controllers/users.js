const userModel = require("../prisma/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/** 사용자 회원가입 API */
exports.createUser = async (req, res, next) => {
  const { clientId, email, password, pwMatch, name, role } = req.body;

  if (role && !["user", "admin"].includes(role)) {
    return res.status(400).json({
      success: false,
      message: "사용자 권한 등급이 올바르지 않습니다.",
    });
  }

  //clientId 존재 유뮤에 따른 분기처리
  if (!clientId) {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "이메일은 필수값입니다." });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "비밀번호는 필수값입니다." });
    }
    if (!pwMatch) {
      return res
        .status(400)
        .json({ success: false, message: "비밀번호 확인은 필수값입니다." });
    }
  }
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "사용자 이름은 필수값입니다." });
  }

  if (clientId) {
    // 카카오 ClientId 사용자 검증
    const kakaoUser = await userModel.users.findFirst({
      where: {
        clientId,
      },
    });
    if (kakaoUser) {
      return res
        .status(400)
        .json({ errorMessage: "이미 가입된 사용자입니다." });
    }
    // 카카오 사용자 name은 null
    // ClientId도 해시 처리를 해줘야한다.
    const hashedClientId = await bcrypt.hash(clientId, 10);

    await userModel.users.create({
      data: {
        clientId: hashedClientId,
        name,
        role,
      },
    });
  } else {
    // 이메일 유저 검증
    const emailUser = await userModel.users.findFirst({
      where: {
        email,
      },
    });

    if (emailUser) {
      return res
        .status(400)
        .json({ errorMessage: "이미 가입된 이메일입니다." });
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

    await userModel.users.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });
  }

  return res.status(201).json({ data: { email, name } });
};

/** 사용자 로그인 API */
exports.userLogin = async (req, res, next) => {
  const { clientId, email, password } = req.body;
  let user;
  //clientId 존재 유뮤에 따른 분기처리
  if (clientId) {
    // 카카오 로그인

    user = await userModel.users.findFirst({
      where: {
        clientId,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ errorMessage: "존재하지 않는 이메일입니다." });
    }
  } else {
    // 이메일 로그인
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "이메일은 필수값입니다." });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "비밀번호는 필수값입니다." });
    }

    user = await userModel.users.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ errorMessage: "존재하지 않는 이메일입니다." });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ errorMessage: "비밀번호가 일치하지 않습니다." });
    }
  }

  const accessToken = jwt.sign(
    {
      userId: user.userId,
    },
    process.env.JWT_ACCESS_SECRET_KEY,
    { expiresIn: "12h" },
  );
  const refreshToken = jwt.sign(
    { userId: user.userId },
    process.env.JWT_REFRESH_SECRET_KEY,
    { expiresIn: "7d" },
  );

  return res.json({ accessToken, refreshToken });
};

/** 내 정보 조회  */
exports.getMyInfos = (req, res) => {
  const user = req.user;
  return res.json({
    email: user.email,
    name: user.name,
  });
};
