const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Users",
  tableName: "Users",
  columns: {
    userId: {
      primary: true,
      type: "int",
      generated: true,
    },
    clientId: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
    role: {
      type: "varchar",
    },
    name: {
      type: "varchar",
    },
    createdAt: {
      type: "datetime",
    },
    updatedAt: {
      type: "datetime",
    },
  },
  relations: {
    resumes: {
      // 사용자와의 관계
      target: "Resumes",
      type: "one-to-many", // Users 테이블과 Resumes 테이블 간의 1:N 관계
      inverseSide: "user", // Resumes 엔터티에 정의된 관계의 이름
    },
  },
});
