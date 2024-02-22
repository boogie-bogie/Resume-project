const express = require("express");

/**Prisma ORM, Redis 의존성 주입 */
const prisma = require("../utils/prisma/index");
const { dataSource } = require("../src/typeorm/index");
const redisClient = require("../redis/client");

const UsersRepository = require("../src/repositories/users.repository");
const AuthService = require("../src/services/auth.service");
const AuthController = require("../src/controllers/auth.controller");

const router = express.Router();

const usersRepository = new UsersRepository(prisma, dataSource, redisClient);
const authService = new AuthService(usersRepository);
const authController = new AuthController(authService);

router.post("/token", authController.generateAccessTokenByRefreshToken);

module.exports = router;
