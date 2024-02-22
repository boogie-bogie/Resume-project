const { tokenKey } = require("../../redis/keys");

class UsersRepository {
  constructor(dataSource, redisClient) {
    this.dataSource = dataSource;
    this.redisClient = redisClient;
  }

  findUserByEmail = async (email) => {
    const emailUser = await this.dataSource.getRepository("Users").findOne({
      where: {
        email: email,
      },
    });
    return emailUser;
  };

  createEmailUser = async (email, password, name, role) => {
    const createdEmailUser = await this.dataSource
      .getRepository("Users")
      .create({
        email,
        password,
        name,
        role,
      });
    return createdEmailUser;
  };

  findUserByClientId = async (clientId) => {
    const kakaoUser = await this.dataSource.getRepository("Users").findOne({
      where: {
        clientId,
      },
    });
    return kakaoUser;
  };

  createKakaoUser = async (clientId, name, role) => {
    const createdKakaoUser = await this.dataSource
      .getRepository("Users")
      .create({
        clientId,
        name,
        role,
      });
    return createdKakaoUser;
  };

  findUserByUserId = async (userId) => {
    // 토큰에 있는 userId가 있으니까, 갖고 있는 토큰 정보를 가져오기 위해 user를 불러온다.
    const user = await this.dataSource.getRepository("Users").findOne({
      where: {
        userId,
      },
    });
    return user;
  };
  saveToken = async (userId, refreshToken) => {
    return this.redisClient.hSet(tokenKey(userId), "token", refreshToken);
  };
}

module.exports = UsersRepository;
