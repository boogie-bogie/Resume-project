const express = require("express");

/**Prisma ORM, Redis 의존성 주입 */
const { dataSource } = require("../src/typeorm/index");
const redisClient = require("../redis/client");

const UsersRepository = require("../src/repositories/users.repository");
const UsersService = require("../src/services/users.service");
const UsersController = require("../src/controllers/users.controller");

const jwtValidateMiddleware = require("../middlewares/jwt-validate.Middleware");

const router = express.Router();

const usersRepository = new UsersRepository(dataSource, redisClient);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

router.post("/sign-up", usersController.createUser);
router.post("/sign-in", usersController.userLogin);
router.get("/users", jwtValidateMiddleware, usersController.getMyInfos);

module.exports = router;
