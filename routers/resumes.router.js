const express = require("express");

/**Prisma ORM, Redis 의존성 주입 */
const { dataSource } = require("../src/typeorm/index");
const redisClient = require("../redis/client");

const ResumesRepository = require("../src/repositories/resumes.repository");
const ResumesService = require("../src/services/resumes.service");
const ResumesController = require("../src/controllers/resumes.controller");

const jwtValidateMiddleware = require("../middlewares/jwt-validate.Middleware");

const router = express.Router();

const resumesRepository = new ResumesRepository(dataSource, redisClient);
const resumesService = new ResumesService(resumesRepository);
const resumesController = new ResumesController(resumesService);

router.get("/resumes", resumesController.getAllResumes);
router.get("/resumes/:resumeId", resumesController.getResumeById);
router.post(
  "/resumes",

  jwtValidateMiddleware,
  resumesController.createResume,
);
router.patch(
  "/resumes/:resumeId",
  jwtValidateMiddleware,
  resumesController.updateResume,
);
router.delete(
  "/resumes/:resumeId",
  jwtValidateMiddleware,
  resumesController.deleteResume,
);

module.exports = router;
