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
//           .json({ message: "토큰이 만료되었습니다. 다시 로그인 해주세요!" });
//       case "JsonWebTokenError":
//         return res
//           .status(401)
//           .json({ message: "토큰이 조작되었습니다. 다시 로그인 해주세요!" });
//       default:
//         return res
//           .status(401)
//           .json({ message: error.message ?? "비정상적인 요청입니다." });
//     }
//   }
// };

const authMiddleware = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(400).json({
      errorMessage: "Access Token이 존재하지 않습니다. 로그인이 필요합니다.",
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
};

function validateToken(token, secretKey) {
  try {
    const payload = jwt.verify(token, secretKey);
    return payload;
  } catch (error) {
    return null;
  }
}
module.exports = authMiddleware;
