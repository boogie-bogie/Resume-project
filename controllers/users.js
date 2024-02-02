const userModel = require("../prisma/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/** 사용자 회원가입 API */
exports.createUser = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

/** 사용자 로그인 API */
// exports.userLogin = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const isExistUser = await userModel.users.findFirst({
//       where: {
//         email,
//       },
//     });
//     if (!isExistUser) {
//       return res.status(408).json({ errorMessage: "존재하지 않는 이메일입니다." });
//     }
//     if (!(await bcrypt.compare(password, isExistUser.password))) {
//       return res.status(408).json({ errorMessage: "비밀번호가 일치하지 않습니다." });
//     }

//     const token = jwt.sign(
//       {
//         userId: isExistUser.userId,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "12h" },
//     );
//     res.cookie("authorization", `Bearer ${token}`);

//     return res.status(200).json({ message: "로그인에 성공하였습니다.😄" });
//   } catch (error) {
//     next();
//   }
// };

exports.tokenLogin = async (req, res, next) => {
  try {
    const { email, password, userId } = req.body;
    const isExistUser = await userModel.users.findFirst({
      where: {
        email,
      },
    });
    if (!isExistUser) {
      return res
        .status(400)
        .json({ errorMessage: "존재하지 않는 이메일입니다." });
    }
    if (!(await bcrypt.compare(password, isExistUser.password))) {
      return res
        .status(400)
        .json({ errorMessage: "비밀번호가 일치하지 않습니다." });
    }

    const tokenStorages = {};
    const accessToken = jwt.sign(
      { userid: isExistUser.userId },
      process.env.JWT_ACCESS_SECRET_KEY,
      { expiresIn: "1h" },
    );
    const refreshToken = jwt.sign(
      { userid: isExistUser.userId },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "3d" },
    );

    /** 보통 RefreshToken은 Redis나 DB에 저장한다.
     * 시도 : Users와 1:1 관계에서는 최초 1회 저장되는 것은 확인.
     * 문제 : 최초 로그인 이후 unique 제약조건 때문에 토큰 발행이 되지않아 로그인 불가
     * 해야할일
     * 1. 이미 토큰이 존재할 때, 기존 토큰을 삭제하고 새로운 토큰을 발행하는 로직 필요
     * 2. 토큰이 존재하지 않으면 새로운 토큰 발행 로직 필요
     * 2. token 컬럼에 제약조건?
     */
    // await userModel.refreshtokens.create({
    //   data: {
    //     userId: isExistUser.userId,
    //     token: refreshToken,
    //     expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1h
    //     ip: req.ip,
    //     userAgent: req.headers["user-agent"],
    //   },
    // });

    tokenStorages[refreshToken] = {
      id: isExistUser.userId,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    };

    console.log(tokenStorages);

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    return res.status(200).json({ message: "로그인에 성공하였습니다.😄" });
  } catch (error) {
    next(error);
  }
};

/** 내 정보 조회 */
exports.getMyInfos = async (req, res, next) => {
  const { userId } = req.user;
  const myInfos = await userModel.users.findFirst({
    where: { userId: +userId },
    select: {
      userId: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      userInfos: {
        select: {
          name: true,
          age: true,
          gender: true,
          profileImage: true,
        },
      },
    },
  });

  return res.status(200).json({ myInfos });
};
