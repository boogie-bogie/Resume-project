const prisma = require("../utils/prisma/index");

const findUserByUserId = async (userId) => {
  // 토큰에 있는 userId가 있으니까, 갖고 있는 토큰 정보를 가져오기 위해 user를 불러온다.
  const user = await prisma.users.findFirst({
    where: {
      userId,
    },
  });
  return user;
};

module.exports = { findUserByUserId };
