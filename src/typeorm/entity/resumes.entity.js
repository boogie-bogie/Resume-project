const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Resumes",
  tableName: "Resumes",
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
      type: "datetime",
    },
    updatedAt: {
      type: "datetime",
    },
    userId: {
      // 외래 키 추가
      type: "int",
    },
  },
  relations: {
    user: {
      // 단일 사용자와의 관계
      target: "Users",
      type: "many-to-one", // Resumes 테이블과 Users 테이블 간의 1:N 관계
      joinColumn: {
        name: "userId",
        referencedColumnName: "userId", // 외래 키가 참조하는 Users 테이블의 기본 키
      },
    },
  },
});
