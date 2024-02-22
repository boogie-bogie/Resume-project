const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Resumes",
  tableName: "resumes",
  columns: {
    resumeId: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
    },
    content: {
      type: "varchar",
    },
    createdAt: {
      type: "DateTime",
    },
    updatedAt: {
      type: "DateTime",
    },
  },
  relations: {
    users: {
      target: "Users",
      type: "many-to-one", //Users 테이블과 1:N관계
      joinTable: true,
      joinColumn: { name: "userId" },
      cascade: true,
    },
  },
});
