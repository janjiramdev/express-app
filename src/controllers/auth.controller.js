import * as middlewareConstant from "../constants/middleware.constant.js";
import * as authService from "../services/auth.service.js";
import createLogger from "../utils/logger.js";

const logger = new createLogger("AuthController");

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { id } = await authService.register(username, password);

    logger.info(`register success for user with id: ${id}`);
    return res.status(201).json({ id, username });
  } catch (err) {
    const message = err.message ?? JSON.stringify(err);
    const statusCode = err.statusCode ?? 500;

    logger.error(`register error: ${message}`);
    return res.status(statusCode).json({
      message,
      statusCode
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { id, accessToken, refreshToken } = await authService.login(
      username,
      password
    );

    logger.info(`login success for user with id: ${id}`);
    return res.status(200).json({
      accessToken,
      refreshToken
    });
  } catch (err) {
    const message = err.message ?? JSON.stringify(err);
    const statusCode = err.statusCode ?? 500;

    logger.error(`login error: ${message}`);
    return res.status(statusCode).json({
      message,
      statusCode
    });
  }
};

export const refreshTokens = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const newTokens = await authService.refreshTokens(refreshToken);

    logger.info("refreshTokens success");
    return res.status(200).json(newTokens);
  } catch (err) {
    const message = err.message ?? JSON.stringify(err);
    let statusCode = err.statusCode ?? 500;
    if (middlewareConstant.jwtErrorList.includes(message)) statusCode = 401;

    logger.error(`refreshTokens error: ${message}`);
    return res.status(statusCode).json({
      message,
      statusCode
    });
  }
};
