exports.createUser = async (req, res, next) => {
  await prisma.user.create({
    data: {
      email: "user@example.com",
      password: {
        create: {
          hash: "passwordHash",
        },
      },
      roletype: [UserRoleType.ADMIN, UserRoleType.USER],
    },
  });
  return res.json({ message: "createUser.😄" });
};

exports.getUsers = async (req, res, next) => {
  return res.json({ message: "getUsers.😄" });
};

exports.getUserById = async (req, res, next) => {
  return res.json({ message: "getUserById.😄" });
};
