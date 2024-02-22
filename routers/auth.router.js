const express = require("express");

/**Prisma ORM, Redis 의존성 주입 */
const { dataSource } = require("../src/typeorm/index");
const redisClient = require("../redis/client");

const UsersRepository = require("../src/repositories/users.repository");
const AuthService = require("../src/services/auth.service");
const AuthController = require("../src/controllers/auth.controller");

const router = express.Router();

const usersRepository = new UsersRepository(dataSource, redisClient);
const authService = new AuthService(usersRepository);
const authController = new AuthController(authService);

router.post("/token", authController.generateAccessTokenByRefreshToken);

module.exports = router;
