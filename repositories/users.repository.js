const tokenKey = require("../redis/keys");

class UsersRepository {
  constructor(prisma, redisClient) {
    this.prisma = prisma;
    this.redisClient = redisClient;
  }

  findUserByEmail = async (email) => {
    const emailUser = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    return emailUser;
  };

  createEmailUser = async (email, password, name, role) => {
    const createdEmailUser = await this.prisma.users.create({
      data: {
        email,
        password,
        name,
        role,
      },
    });
    return createdEmailUser;
  };

  findUserByClientId = async (clientId) => {
    const kakaoUser = await this.prisma.users.findFirst({
      where: {
        clientId,
      },
    });
    return kakaoUser;
  };

  createKakaoUser = async (clientId, name, role) => {
    const createdKakaoUser = await this.prisma.users.create({
      data: {
        clientId,
        name,
        role,
      },
    });
    return createdKakaoUser;
  };

  saveToken = async (userId, refreshToken) => {
    return this.redisClient.hSet(tokenKey(userId), "token", refreshToken);
  };
}

module.exports = UsersRepository;
