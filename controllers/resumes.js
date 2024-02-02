const resumeModel = require("../prisma/index");

/** 이력서 조회 API */
exports.getResumes = async (req, res, next) => {
  const { orderKey, orderValue } = req.query;

  let orderBy = {};
  if (orderKey && orderValue) {
    orderBy[orderKey] = { [orderValue.toUpperCase()]: true };
  } else {
    orderBy = { createdAt: "desc" };
  }

  const resumes = await resumeModel.resumes.findMany({
    include: {
      user: {
        select: {
          userInfos: {
            select: { name: true },
          },
        },
      },
    },
    orderBy,
  });
  return res.status(200).json({ resumes });
};

/** 이력서 세부 조회 API */
exports.getResumeById = async (req, res, next) => {
  const { resumeId } = req.params;
  const resume = await resumeModel.resumes.findFirst({
    where: {
      resumeId: +resumeId,
    },
    include: {
      user: {
        select: {
          userInfos: {
            select: { name: true },
          },
        },
      },
    },
  });
  return res.status(200).json({ data: resume });
};

/** 추가인증  */

/** 이력서 생성 API */
exports.createResume = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { title, content } = req.body;

    const resume = await resumeModel.resumes.create({
      data: {
        title,
        content,
        status: "APPLY",
        user: { connect: { userId: +userId } },
      },
    });

    return res.status(201).json({ message: "이력서가 생성되었습니다.😄" });
  } catch (error) {
    // console.error("이력서 생성 중 오류:", error);
    next(error);
  }
};

/** 이력서 수정 API */
exports.updateResume = async (req, res, next) => {
  try {
    const { resumeId } = req.params;
    const { title, content, status } = req.body;

    const resume = await resumeModel.resumes.findUnique({
      where: {
        resumeId: +resumeId,
      },
    });

    if (!resume)
      return res
        .status(404)
        .json({ errorMessage: "이력서 조회에 실패하였습니다." });

    await resumeModel.resumes.update({
      data: {
        title,
        content,
        status,
      },
      where: {
        resumeId: +resumeId,
      },
    });

    return res
      .status(200)
      .json({ message: "이력서가 성공적으로 업데이트되었습니다.😄" });
  } catch (error) {
    // console.error("이력서 업데이트 중 오류 발생:", error);
    next(error);
  }
};

/** 이력서 삭제 API */
exports.deleteResume = async (req, res, next) => {
  try {
    const { resumeId } = req.params;
    const { password } = req.body;
    const resume = await resumeModel.resumes.findUnique({
      where: {
        resumeId: +resumeId,
      },
    });

    if (!resume)
      return res
        .status(404)
        .json({ errorMessage: "이력서 조회에 실패하였습니다." });
    await resumeModel.resumes.delete({
      where: {
        resumeId: +resumeId,
      },
    });

    return res.status(200).json({ message: "이력서가 삭제되었습니다. 😄" });
  } catch (error) {
    // console.error("이력서 업데이트 중 오류 발생:", error);
    next(error);
  }
};
