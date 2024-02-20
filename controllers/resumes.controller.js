class ResumesController {
  constructor(resumesService) {
    this.resumesService = resumesService;
  }
  /**
   * 1. Request
   * 2. 유효성 검사
   * 3. 서비스 계층에 요청
   * 4. Response
   */
  getAllResumes = async (req, res, next) => {
    try {
      // Request
      const orderKey = req.query.orderKey ?? "resumeId";
      const orderValue = req.query.orderValue ?? "desc";

      // 유효성 검사
      if (!["resumeId", "status"].includes(orderKey))
        throw new Error("orderKey 가 올바르지 않습니다.");
      if (!["asc", "desc"].includes(orderValue.toLowerCase()))
        throw new Error("orderValue 가 올바르지 않습니다.");

      // 이력서 목록 조회
      const resumes = await this.resumesService.getAllResumes(
        orderKey,
        orderValue,
      );

      // Response
      return res.json({ data: resumes });
    } catch (error) {
      next(error);
    }
  };

  getResumeById = async (req, res, next) => {
    try {
      // Request
      const { resumeId } = req.params;
      // 유효성 검사
      if (!resumeId) throw new Error("resumeId는 필수값입니다.");
      // 이력서 세부 조회
      const resume = await this.resumesService.getResumeById(resumeId);
      // Response
      return res.status(200).json({ data: resume });
    } catch (error) {
      next(error);
    }
  };

  createResume = async (req, res, next) => {
    try {
      // Request
      const userId = req.user.userId;
      const { title, content } = req.body;

      // 유효성 검사
      if (!title) throw new Error("이력서 제목은 필수 항목입니다.");
      if (!content) throw new Error("자기소개는 필수 항목입니다.");

      // 이력서 목록 생성
      const createdResume = await this.resumesService.createResume(
        title,
        content,
        userId,
      );

      // Response
      return res
        .status(201)
        .json({ message: "이력서가 생성되었습니다.😄", data: createdResume });
    } catch (error) {
      next(error);
    }
  };

  updateResume = async (req, res, next) => {
    try {
      // Request
      const { resumeId } = req.params;
      const { title, content, status } = req.body;
      const user = req.user;
      // 유효성 검사
      if (!resumeId) throw new Error("resumeId는 필수값입니다.");
      if (!title) throw new Error("이력서 제목은 필수 항목입니다.");
      if (!content) throw new Error("자기소개는 필수 항목입니다.");
      if (!status) throw new Error("지원 상태는 필수 항목입니다.");
      if (
        ![
          "APPLY",
          "DROP",
          "PASS",
          "INTERVIEW1",
          "INTERVIEW2",
          "FINAL_PASS",
        ].includes(status)
      )
        throw new Error(
          "올바르지 않은 상태값입니다. 지원 상태는 'APPLY', 'DROP', 'PASS', 'INTERVIEW1', 'INTERVIEW2', 'FINAL_PASS' 중 하나의 항목만 기재하실 수 있습니다. ",
        );

      // 이력서 수정
      const updatedResume = await this.resumesService.updateResume(
        user,
        resumeId,
        title,
        content,
        status,
      );
      // Response
      return res.status(201).json({
        message: "이력서가 성공적으로 업데이트되었습니다.😄",
        updatedResume,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteResume = async (req, res, next) => {
    try {
      // Request
      const user = req.user;
      const { resumeId } = req.params;

      // 유효성검사
      if (!resumeId) throw new Error("resumeId는 필수값입니다.");

      // 이력서 삭제
      const deletedResume = await this.resumesService.deleteResume(
        user,
        resumeId,
      );

      // Response
      return res
        .status(201)
        .json({ message: "이력서가 삭제되었습니다. 😄", data: deletedResume });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ResumesController;
