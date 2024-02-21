const express = require("express");

/**Prisma ORM, Redis 의존성 주입 */
const prisma = require("../utils/prisma/index");
const redisClient = require("../redis/client");

const ResumesRepository = require("../repositories/resumes.repository");
const ResumesService = require("../services/resuems.service");
const ResumesController = require("../controllers/resumes.controller");

const jwtValidateMiddleware = require("../middlewares/jwt-validate.Middleware");
const authMiddleware = require("../middlewares/auth.Middleware");

const router = express.Router();

const resumesRepository = new ResumesRepository(prisma, redisClient);
const resumesService = new ResumesService(resumesRepository);
const resumesController = new ResumesController(resumesService);

router.get("/resumes", resumesController.getAllResumes);
router.get("/resumes/:resumeId", resumesController.getResumeById);
router.post(
  "/resumes",
  jwtValidateMiddleware,
  authMiddleware,
  resumesController.createResume,
);
router.patch(
  "/resumes/:resumeId",
  jwtValidateMiddleware,
  authMiddleware,
  resumesController.updateResume,
);
router.delete(
  "/resumes/:resumeId",
  jwtValidateMiddleware,
  authMiddleware,
  resumesController.deleteResume,
);

module.exports = router;
