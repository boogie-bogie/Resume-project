const resumeModel = require("../prisma/index");

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
    console.error("이력서 생성 중 오류:", error);
    next();
  }
};

exports.getResumes = async (req, res, next) => {
  try {
    const { orderKey, orderValue } = req.query;

    let orderBy = {};
    if (orderKey && orderValue) {
      orderBy[orderKey] = { [orderValue.toUpperCase()]: true };
    } else {
      orderBy = { createdAt: "desc" };
    }

    const resumes = await resumeModel.resumes.findMany({
      select: {
        resumeId: true,
        userId: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy,
    });

    return res.status(200).json({ resumes });
  } catch (error) {
    console.error("이력서 조회 중 오류:", error);
    next();
  }
};
