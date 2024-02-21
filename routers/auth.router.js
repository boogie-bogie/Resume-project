const express = require("express");

const authController = require("../src/controllers/auth.controller");
const router = express.Router();

router.post("/token", authController.generateAccessTokenByRefreshToken);

module.exports = router;
