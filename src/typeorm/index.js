// require("dotenv").config();
// const typeorm = require("typeorm");

// const dataSource = new typeorm.DataSource({
//   type: "mysql",
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   synchronize: false, //왠만하면 항상 false로 쓰자
//   entities: [
//     require("./entity/users.entity"),
//     require("./entity/resumes.entity"),
//   ],
// });

// dataSource.initialize(); // 실행함수

// module.exports = { dataSource };

// require("dotenv").config();

// const typeorm = require("typeorm");

// const dataSource = new typeorm.DataSource({
//   type: "mysql",
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   synchronize: false,
//   logging: false,
//   entities: [
//     require("./entity/users.entity"),
//     require("./entity/resumes.entity"),
//   ],

// });

// module.exports = {
//   async connect() {
//     await dataSource
//       .initialize()
//       .then(function () {
//         console.log("분석용 연결 완료");
//       })
//       .catch(function (error) {
//         console.log("Error: ", error);
//       });
//   },
//   async close() {
//     await dataSource.destroy().then(() => {
//       console.log("분석용 연결 해제");
//     });
//   },
//   dataSource,
// // };

// const { createConnection } = require("typeorm");
// const { UsersEntity } = require("./entity/users.entity.js");
// const { ResumesEntity } = require("./entity/resumes.entity.js");
// const connectionPromise = createConnection({
//   type: "mysql",
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   synchronize: false,
//   logging: false,
//   entities: [UsersEntity, ResumesEntity],
// })
//   .then((connection) => {
//     console.log("Connection established");
//     return connection;
//   })
//   .catch((error) => {
//     console.log("Connection error: ", error);
//     throw error;
//   });
// module.exports = connectionPromise;
