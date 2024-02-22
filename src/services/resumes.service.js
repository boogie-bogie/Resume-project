class ResumesService {
  constructor(resumesRepository) {
    this.resumesRepository = resumesRepository;
  }

  /**
   * 1. Parameter
   * 2. 검증 로직
   * 3. 레파지토리 계층에 요청
   * 4. Return 컨트롤러 계층에 반환할 데이터 가공하기
   */
  getAllResumes = async (orderKey, orderValue) => {
    const resumes = await this.resumesRepository.getAllResumes(
      orderKey,
      orderValue,
    );

    return resumes;
  };

  getResumeById = async (resumeId) => {
    const resume = await this.resumesRepository.getResumeById(resumeId);
    if (!resume) throw new Error("존재하지 않는 이력서입니다.");
    return resume;
  };

  createResume = async (title, content, userId) => {
    const createdResume = await this.resumesRepository.createResume(
      title,
      content,
      userId,
    );

    return createdResume;
  };

  updateResume = async (user, resumeId, title, content, status) => {
    // 수정할 이력서 조회
    const resume = await this.resumesRepository.getResumeById(resumeId);
    if (!resume) throw new Error("존재하지 않는 이력서입니다.");
    // if (user.role === "user" && resume.userId !== user.userId)
    //   throw new Error("올바르지 않은 요청입니다.");
    // 이력서 수정
    const updatedResume = await this.resumesRepository.updateResume(
      resumeId,
      title,
      content,
      status,
    );
    return updatedResume;
  };

  deleteResume = async (user, resumeId) => {
    // 삭제할 이력서 조회
    const resume = await this.resumesRepository.getResumeById(resumeId);
    // 조회 및 권한 검증
    if (!resume) {
      throw new Error("존재하지 않는 이력서입니다.");
    }
    // if (resume.userId !== user.userId)
    //   throw new Error("올바르지 않은 요청입니다.");
    // 이력서 삭제
    const deletedResume = await this.resumesRepository.deleteResume(resumeId);

    return deletedResume;
  };
}

module.exports = ResumesService;
