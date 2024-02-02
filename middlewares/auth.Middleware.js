const jwt = require("jsonwebtoken");
// const userModel = require("../prisma/index");

/**기존 사용자 인증 미들웨어 'authorization' */
// const authMiddleware = async function (req, res, next) {
//   try {
//     const { authorization } = req.cookies;
//     if (!authorization)
//       throw new Error("토큰이 존재하지 않습니다. 다시 로그인 해주세요!");

//     const [tokenType, token] = authorization.split(" ");

//     if (tokenType !== "Bearer")
//       throw new Error("Token 형식이 일치하지 않습니다.  다시 로그인 해주세요!");

//     const decodedValueByVerify = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decodedValueByVerify.userId;

//     const user = await userModel.users.findFirst({
//       where: { userId: +userId },
//     });
//     if (!user) {
//       res.clearCookie("authorization");
//       throw new Error("토큰 사용자가 존재하지 않습니다. 회원가입을 해주세요!");
//     }
//     req.user = user;

//     next();
//   } catch (error) {
//     res.clearCookie("authorization");

//     switch (error.name) {
//       case "TokenExpiredError":
//         return res
//           .status(401)
//           .json({ errorMessage: "토큰이 만료되었습니다. 다시 로그인 해주세요!" });
//       case "JsonWebTokenError":
//         return res
//           .status(401)
//           .json({ errorMessage: "토큰이 조작되었습니다. 다시 로그인 해주세요!" });
//       default:
//         return res
//           .status(401)
//           .json({ message: error.message ?? "비정상적인 요청입니다." });
//     }
//   }
// };

const authMiddleware = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  /** 검증해야하는 케이스
   * 1. accessToken과 refreshToken 모두 만료된 경우 -> 에러 발생 -> 로그인 필요
   * 2. accessToken이 만료됐지만, refreshToken은 유효한 경우 -> access token 재발급
   * 3. accessToken은 유효하지만, refreshToken은 만료된 경우 -> refresh token 재발급
   * 4. accessToken과 refreshToken 모두 유효된 경우 -> next() */
  if (!accessToken && !refreshToken) {
    return res.status(401).json({
      errorMessage: "API 사용 권한이 없습니다. 로그인이 필요합니다.",
    });
  }

  const payload = validateToken(accessToken, process.env.JWT_ACCESS_SECRET_KEY);

  if (!payload) {
    return res
      .status(401)
      .json({ errorMessage: "Access Token이 유효하지 않습니다." });
  }
  const { userid } = payload;
  console.log(payload);
  return res.json({ message: `${userid} : 성공적으로 인증되었습니다.😄` });
  function validateToken(token, secretKey) {
    try {
      const payload = jwt.verify(token, secretKey);
      return payload;
    } catch (error) {
      return null;
    }
  }
};

module.exports = authMiddleware;
