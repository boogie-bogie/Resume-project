const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  createUserByEmail = async (email, password, name, role) => {
    const emailUser = await this.usersRepository.findUserByEmail(email);
    if (emailUser) throw new Error("이미 가입된 이메일입니다.");

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdEmailUser = await this.usersRepository.createEmailUser(
      email,
      hashedPassword,
      name,
      role,
    );
    return {
      email: createdEmailUser.email,
      name: createdEmailUser.name,
    };
  };

  createUserByClientId = async (clientId, name, role) => {
    const kakaoUser = await this.usersRepository.findUserByClientId(clientId);
    if (kakaoUser) throw new Error("이미 가입된 사용자 입니다.");

    const hashedClientId = await bcrypt.hash(clientId, 10);
    const createdKakaoUser = await this.usersRepository.createKakaoUser(
      hashedClientId,
      name,
      role,
    );
    return {
      name: createdKakaoUser.name,
    };
  };

  loginUserByEmail = async (email, password) => {
    const emailUser = await this.usersRepository.findUserByEmail(email);
    if (!emailUser) throw new Error("존재하지 않는 이메일입니다.");
    if (!(await bcrypt.compare(password, emailUser.password)))
      throw new Error("비밀번호가 일치하지 않습니다.");

    // Token 발급
    const accessToken = jwt.sign(
      {
        userId: emailUser.userId,
      },
      process.env.JWT_ACCESS_SECRET_KEY,
      { expiresIn: "12h" },
    );
    const refreshToken = jwt.sign(
      {
        userId: emailUser.userId,
      },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "7d" },
    );
    // Redis에 RefreshToken 저장
    await this.usersRepository.saveToken(emailUser.userId, refreshToken);
    // Return
    return { accessToken, refreshToken };
  };
  loginUserByClientId = async (clientId) => {
    const kakaoUser = await this.usersRepository.findUserByClientId(clientId);
    if (!kakaoUser) throw new Error("존재하지 않는 사용자입니다.");
    // Token 발급
    const accessToken = jwt.sign(
      {
        userId: kakaoUser.userId,
      },
      process.env.JWT_ACCESS_SECRET_KEY,
      { expiresIn: "12h" },
    );
    const refreshToken = jwt.sign(
      {
        userId: kakaoUser.userId,
      },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "7d" },
    );
    // Redis에 RefreshToken 저장
    await this.usersRepository.saveToken(kakaoUser.userId, refreshToken);
    // Return
    return { accessToken, refreshToken };
  };
}

module.exports = UsersService;
