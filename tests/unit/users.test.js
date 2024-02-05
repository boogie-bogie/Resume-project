const userController = require("../../controllers/users");
const userModel = require("../../prisma/index");
const httpMocks = require("node-mocks-http");

// 테스트용 데이터
const newUser = require("../data/new-user.data.json");
const allUsers = require("../data/all-user.data.json");
