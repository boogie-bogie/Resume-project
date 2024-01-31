const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumes");
const authMiddleware = require("../middlewares/auth.Middleware");

router.get("/resumes", resumeController.getResumes);
router.post("/resumes", authMiddleware, resumeController.createResume);

module.exports = router;
