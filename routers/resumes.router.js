const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumes");

router.get("/resumes", resumeController.getResumes);

module.exports = router;
