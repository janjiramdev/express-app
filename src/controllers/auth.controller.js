import * as middlewareConstant from "../constants/middleware.constant.js";
import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { id } = await authService.register(username, password);
    return res.status(201).json({ id, username });
  } catch (err) {
    const message = err.message ?? JSON.stringify(err);
    const statusCode = err.statusCode ?? 500;
    return res.status(statusCode).json(message);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { accessToken, refreshToken } = await authService.login(
      username,
      password
    );

    return res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    const message = err.message ?? JSON.stringify(err);
    const statusCode = err.statusCode ?? 500;

    return res.status(statusCode).json(message);
  }
};

export const refreshTokens = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const newTokens = await authService.refreshTokens(refreshToken);
    return res.status(200).json(newTokens);
  } catch (err) {
    const message = err.message ?? JSON.stringify(err);
    let statusCode = err.statusCode ?? 500;
    if (middlewareConstant.jwtErrorList.includes(message)) statusCode = 401;
    return res.status(statusCode).json(message);
  }
};
