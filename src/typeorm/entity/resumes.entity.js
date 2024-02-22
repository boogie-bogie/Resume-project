const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Resumes",
  tableName: "Resumes",
  columns: {
    resumeId: {
      primary: true,
      type: "int",
      generated: "increment",
    },
    userId: {
      // 외래 키 추가
      type: "int",
    },
    title: {
      type: "varchar",
    },
    content: {
      type: "varchar",
    },
    status: {
      type: "enum",
      enum: ["APPLY", "DROP", "PASS", "INTERVIEW1", "INTERVIEW2", "FINAL_PASS"],
      default: "APPLY",
    },
    createdAt: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
    },
    updatedAt: {
      type: "datetime",
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
