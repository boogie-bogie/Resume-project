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
        const createdEmailUser = await this.usersService.createUserByEmail(
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
        const createdKakaoUser = await this.usersService.createUserByClientId(
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
      const { clientId, email, password } = req.body;
      // 이메일 회원 로그인
      if (!clientId) {
        // 유효성 검사
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
        // 토큰 발급
        const emailUserToken = await this.usersService.loginUserByEmail(
          email,
          password,
        );
        // Response
        res.json({ emailUserToken });
      } else {
        // 이메일 회원 로그인
        const kakaoUserToken =
          await this.usersService.signInUserByClientId(clientId);
        // Response
        res.json({ kakaoUserToken });
      }
    } catch (error) {
      next(error);
    }
  };

  getMyInfos = async (req, res, next) => {
    try {
      // Request
      const user = req.user;
      // Response
      return res.json({
        email: user.email,
        name: user.name,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UsersController;
