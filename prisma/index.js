const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
  errorFormat: "pretty",
});

prisma
  .$connect()
  .then(() => {
    console.log("Prisma 연결 완료");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = prisma;
