class ResumesRepository {
  constructor(dataSource, redisClient) {
    this.dataSource = dataSource;
    this.redisClient = redisClient;
  }
  /**
   * 1. Parameter
   * 2. DB 사용 로직
   * 4. Return 서비스 계층에 전달할 데이터
   */

  getAllResumes = async (orderKey, orderValue) => {
    /**delay
     * API 요청에 대해 반환까지 랜덤으로 0-5초 이상 걸리는 경우
     * console 출력과 Slack 알림 기능을 추가
     */
    const randomNumber = Math.floor(Math.random() * 6);
    console.log("randomNumber", randomNumber);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, randomNumber * 1000);
    });

    const resumes = await this.dataSource.getRepository("Resumes").find({
      select: {
        resumeId: true,
        title: true,
        content: true,
        status: true,
        user: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
      order: {
        [orderKey]: orderValue.toLowerCase(),
      },
    });
    return resumes;
  };

  getResumeById = async (resumeId) => {
    const resume = await this.dataSource.getRepository("Resumes").findOne({
      where: {
        resumeId: +resumeId,
      },
      select: {
        resumeId: true,
        title: true,
        content: true,
        user: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
    });
    return resume;
  };

  createResume = async (title, content, userId) => {
    const createdResume = await this.dataSource.getRepository("Resumes").save({
      title,
      content,
      status: "APPLY",
      userId,
    });
    return createdResume;
  };

  updateResume = async (resumeId, title, content, status) => {
    const updatedResume = await this.dataSource.getRepository("Resumes").update(
      {
        resumeId: +resumeId,
      },
      {
        title,
        content,
        status,
      },
    );
    return updatedResume;
  };

  deleteResume = async (resumeId) => {
    const deletedResume = await this.dataSource
      .getRepository("Resumes")
      .delete({
        resumeId: +resumeId,
      });
    return deletedResume;
  };
}

module.exports = ResumesRepository;
