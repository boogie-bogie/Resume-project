const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const authMiddleware = require("../middlewares/auth.Middleware");

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.tokenLogin);
router.get("/users", authMiddleware, userController.getMyInfos);

module.exports = router;
