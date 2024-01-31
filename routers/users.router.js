const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.get("/users", userController.getUsers);
router.post("/sign-up", userController.createUser);

module.exports = router;
