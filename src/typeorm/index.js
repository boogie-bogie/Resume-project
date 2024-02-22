require("dotenv").config();
const typeorm = require("typeorm");

const dataSource = new typeorm.DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false, //왠만하면 항상 false로 쓰자
  entities: [
    require("./entity/users.entity"),
    require("./entity/resumes.entity"),
  ],
});

dataSource
  .initialize()
  .then(() => {
    console.log("TypeORM Database 연결 성공");
  })
  .catch((error) => {
    console.error("TypeORM Database 연결 실패:", error);
  }); // 실행함수

module.exports = { dataSource };
