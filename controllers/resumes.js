const resumeModel = require("../prisma/index");

/** 이력서 조회 API */
exports.getResumes = async (req, res, next) => {
  const orderKey = req.query.orderKey ?? "resumeId";
  const orderValue = req.query.orderValue ?? "desc";

  if (!["resumeId", "status"].includes(orderKey)) {
    return res
      .status(400)
      .json({ success: false, message: "orderKey 가 올바르지 않습니다." });
  }
  if (!["asc", "desc"].includes(orderValue.toLowerCase())) {
    return res
      .status(400)
      .json({ success: false, message: "orderValue 가 올바르지 않습니다." });
  }

  const resumes = await resumeModel.resumes.findMany({
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
    orderBy: [
      {
        [orderKey]: orderValue.toLowerCase(),
      },
    ],
  });

  return res.json({ data: resumes });
};

/** 이력서 세부 조회 API */
exports.getResumeById = async (req, res, next) => {
  const { resumeId } = req.params;
  if (!resumeId) {
    return res
      .status(400)
      .json({ success: false, message: "resumeId는 필수 값입니다." });
  }
  const resume = await resumeModel.resumes.findFirst({
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

  if (!resume) {
    return res.json({ data: {} });
  }

  return res.status(200).json({ data: resume });
};

/** 이력서 생성 API */
exports.createResume = async (req, res, next) => {
  const user = req.user;
  const { title, content } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "이력서 제목은 필수 항목입니다." });
  }
  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: "자기소개는 필수 항목입니다." });
  }

  await resumeModel.resumes.create({
    data: {
      title,
      content,
      status: "APPLY",
      userId: user.userId,
    },
  });

  return res.status(201).json({ message: "이력서가 생성되었습니다.😄" });
};

/** 이력서 수정 API */
exports.updateResume = async (req, res, next) => {
  const user = req.user;
  console.log(user);
  const resumeId = req.params.resumeId;
  const { title, content, status } = req.body;
  if (!resumeId) {
    return res
      .status(400)
      .json({ success: false, message: "resumeId는 필수값입니다." });
  }
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "이력서 제목은 필수 항목입니다." });
  }
  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: "자기소개는 필수 항목입니다." });
  }
  if (!status) {
    return res
      .status(400)
      .json({ success: false, message: "지원 상태는 필수 항목입니다." });
  }
  if (
    ![
      "APPLY",
      "DROP",
      "PASS",
      "INTERVIEW1",
      "INTERVIEW2",
      "FINAL_PASS",
    ].includes(status)
  ) {
    return res.status(400).json({
      success: false,
      message:
        "올바르지 않은 상태값입니다. 지원 상태는 'APPLY', 'DROP', 'PASS', 'INTERVIEW1', 'INTERVIEW2', 'FINAL_PASS' 중 하나의 항목만 기재하실 수 있습니다. ",
    });
  }
  // 수정할 이력서를 조회한다.
  const resume = await resumeModel.resumes.findFirst({
    where: {
      resumeId: +resumeId,
    },
  });

  if (!resume) {
    return res
      .status(404)
      .json({ success: false, message: "존재하지 않는 이력서입니다." });
  }

  // 'user' 권한을 가지고 있으면서(and) userId가 일치하지 않으면 -> 잘못된 접근
  if (user.role === "user" && resume.userId !== user.userId) {
    return res
      .status(400)
      .json({ success: false, message: "올바르지 않은 요청입니다." });
  }

  // userId가 일치하여 내가 작성한 이력서가 맞거나(or) 'admin' 권한을 가지고 있으면 -> 수정할 수 있다.
  await resumeModel.resumes.update({
    where: {
      resumeId: +resumeId,
    },
    data: {
      title,
      content,
      status,
    },
  });

  return res
    .status(201)
    .json({ message: "이력서가 성공적으로 업데이트되었습니다.😄" });
};

/** 이력서 삭제 API */
exports.deleteResume = async (req, res, next) => {
  const user = req.user;
  const resumeId = req.params.resumeId;

  if (!resumeId) {
    return res
      .status(400)
      .json({ success: false, message: "resumeId는 필수값입니다." });
  }

  // 수정할 이력서를 조회한다.
  const resume = await resumeModel.resumes.findFirst({
    where: {
      resumeId: +resumeId,
    },
  });

  if (!resume) {
    return res
      .status(404)
      .json({ success: false, message: "존재하지 않는 이력서입니다." });
  }
  if (resume.userId !== user.userId) {
    return res
      .status(400)
      .json({ success: false, message: "올바르지 않은 요청입니다." });
  }

  // 내가 작성한 이력서가 맞다.
  await resumeModel.resumes.delete({
    where: {
      resumeId: +resumeId,
    },
  });

  return res.status(201).json({ message: "이력서가 삭제되었습니다. 😄" });
};
