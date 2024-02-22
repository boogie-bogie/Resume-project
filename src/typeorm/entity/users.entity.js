const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Users",
  tableName: "Users",
  columns: {
    userId: {
      primary: true,
      type: "int",
      generated: "increment",
    },
    clientId: {
      type: "varchar",
      nullable: true,
    },
    email: {
      type: "varchar",
      nullable: true,
    },
    password: {
      type: "varchar",
      nullable: true,
    },
    role: {
      type: "varchar",
      nullable: true,
    },
    name: {
      type: "varchar",
      nullable: true,
    },
    createdAt: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
      nullable: true,
    },
    updatedAt: {
      type: "datetime",
      nullable: true,
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
