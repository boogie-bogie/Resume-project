const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Users",
  tableName: "users",
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
      type: "DateTime",
    },
    updatedAt: {
      type: "DateTime",
    },
  },
});
