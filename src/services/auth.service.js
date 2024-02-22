const jwt = require("jsonwebtoken");

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  verifyRefreshToken = async (refreshToken) => {
    // 인증과 유효기간 검증이 완료됐다면, token에 할당
    const token = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
    console.log(token);
    // 토큰에 userId가 없다면, 401번으로 '토큰 정보가 올바르지 않습니다.' 메세지가 출력된다.
    if (!token.userId) {
      console.log(token);
      throw {
        code: 401,
        message: "토큰 정보가 올바르지 않습니다.",
      };
    }

    // 토큰에 있는 userId가 있으니까, 갖고 있는 토큰 정보를 가져오기 위해 user를 불러온다.
    const user = await userRepository.findUserByUserId(token.userId);

    // user 정보를 담고 있는지 검사 -> 없다면 401번으로 '토큰 정보가 올바르지 않습니다.' 출력
    if (!user) {
      throw {
        code: 401,
        message: "토큰 정보가 올바르지 않습니다.",
      };
    }

    // 여기까지 왔으면, refreshToken이 유효한 상태다. -> Access/Refresh 재발급

    const newAccessToken = jwt.sign(
      { userId: user.userId },
      process.env.JWT_ACCESS_SECRET_KEY,
      { expiresIn: "12h" },
    );
    const newRefreshToken = jwt.sign(
      { userId: user.userId },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "7d" },
    );

    // 새로 발급한 newAccess/newRefresh를 기존 토큰에 갱신하여 응답을 반환한다.
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  };
}

module.exports = AuthService;
