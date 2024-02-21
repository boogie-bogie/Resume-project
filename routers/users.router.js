const express = require("express");

/**Prisma ORM, Redis 의존성 주입 */
const prisma = require("../utils/prisma/index");
const redisClient = require("../redis/client");

const UsersRepository = require("../repositories/users.repository");
const UsersService = require("../services/users.service");
const UsersController = require("../controllers/users.controller");

const jwtValidateMiddleware = require("../middlewares/jwt-validate.Middleware");
const authMiddleware = require("../middlewares/auth.Middleware");

const router = express.Router();

const usersRepository = new UsersRepository(prisma, redisClient);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

router.post("/sign-up", usersController.createUser);
router.post("/sign-in", usersController.userLogin);
router.get(
  "/users",
  jwtValidateMiddleware,
  authMiddleware,
  usersController.getMyInfos,
);

module.exports = router;
