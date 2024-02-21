const authService = require("../services/auth.service");

const generateAccessTokenByRefreshToken = async (req, res, next) => {
  try {
    // Request
    const { refreshToken } = req.body;
    // refreshToken 검증 요청
    const token = await authService.verifyRefreshToken(refreshToken);
    // Response
    return res.json(token);
  } catch (error) {
    next(error);
  }
};

module.exports = { generateAccessTokenByRefreshToken };
