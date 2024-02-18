class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  createUser = async (req, res, next) => {
    try {
      // Request
      const { clientId, email, password, pwMatch, name, role } = req.body;
      // 유효성 검사
      if (role && !["user", "admin"].includes(role)) {
        return res.status(400).json({
          success: false,
          message: "사용자 권한 등급이 올바르지 않습니다.",
        });
      }

      if (!name) {
        return res
          .status(400)
          .json({ success: false, message: "사용자 이름은 필수값입니다." });
      }

      if (!clientId) {
        if (!email) {
          return res
            .status(400)
            .json({ success: false, message: "이메일은 필수값입니다." });
        }
        if (!password) {
          return res
            .status(400)
            .json({ success: false, message: "비밀번호는 필수값입니다." });
        }
        if (!pwMatch) {
          return res
            .status(400)
            .json({ success: false, message: "비밀번호 확인은 필수값입니다." });
        }

        if (password.length < 6) {
          return res
            .status(400)
            .json({ errorMessage: "비밀번호는 6자리 이상이어야 합니다." });
        }

        if (password !== pwMatch)
          return res.status(400).json({
            errorMessage: "'비밀번호'와 '비밀번호 확인'이 일치하지 않습니다.",
          });

        // 이메일 회원 회원정보 등록
        const createdEmailUser = await this.usersService.signUpUserByEmail(
          email,
          password,
          name,
          role,
        );

        // Response
        return res.status(201).json({
          data: {
            email: createdEmailUser.email,
            name: createdEmailUser.name,
          },
        });
      } else {
        // clientId가 있는 경우 카카오 회원 회원정보 등록
        const createdKakaoUser = await this.usersService.signUpUserByClientId(
          clientId,
          name,
          role,
        );

        // Response
        return res.status(201).json({
          data: {
            name: createdKakaoUser.name,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  };

  userLogin = async (req, res, next) => {
    try {
      // Request
      // 유효성 검사
      // 이메일 로그인
      // Response
    } catch (error) {
      next(error);
    }
  };

  getMyInfos = async (req, res, next) => {
    try {
      // Request
      // Response
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UsersController;
