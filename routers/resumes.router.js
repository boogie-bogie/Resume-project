const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumes");
const authMiddleware = require("../middlewares/auth.Middleware");

router.get("/resumes", resumeController.getResumes);
router.get("/resumes/:resumeId", resumeController.getResumeById);
router.post("/resumes", authMiddleware, resumeController.createResume);
router.patch(
  "/resumes/:resumeId",
  authMiddleware,
  resumeController.updateResume,
);
router.delete(
  "/resumes/:resumeId",
  authMiddleware,
  resumeController.deleteResume,
);

module.exports = router;
