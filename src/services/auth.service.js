import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../configs/index.config.js";
import * as usersService from "../services/users.service.js";

export const register = async (username, password) => {
  const existingUser = await usersService.findOneByUsername(username);
  if (existingUser) {
    const error = new Error(`user with username: ${username} already exits`);
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await usersService.createUser(username, hashedPassword);
};

export const login = async (username, password) => {
  const user = await usersService.findOneByUsername(username);
  if (!user) {
    const error = new Error(`user with username: ${username} not found`);
    error.statusCode = 404;
    throw error;
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    const error = new Error("incorrect password");
    error.statusCode = 400;
    throw error;
  }

  const accessToken = jwt.sign(
    { id: user.id, username: user.username },
    config.authentication.accessTokenSecret,
    { expiresIn: config.authentication.accessTokenExpireTime }
  );
  const refreshToken = jwt.sign(
    { id: user.id, username: user.username },
    config.authentication.refreshTokenSecret,
    { expiresIn: config.authentication.refreshTokenExpireTime }
  );

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  await usersService.updateUserRefreshToken(user.id, hashedRefreshToken);

  return { accessToken, refreshToken };
};

export const refreshTokens = async (refreshToken) => {
  const decodedToken = jwt.verify(
    refreshToken,
    config.authentication.refreshTokenSecret
  );

  const user = await usersService.findOneById(decodedToken.id);
  const isRefreshTokenMatch = await bcrypt.compare(
    refreshToken,
    user.refreshToken
  );
  if (!isRefreshTokenMatch) {
    const error = new Error("incorrect refreshToken");
    error.statusCode = 400;
    throw error;
  }

  const newAccessToken = jwt.sign(
    { id: user.id, username: user.username },
    config.authentication.accessTokenSecret,
    { expiresIn: config.authentication.accessTokenExpireTime }
  );
  const newRefreshToken = jwt.sign(
    { id: user.id, username: user.username },
    config.authentication.refreshTokenSecret,
    { expiresIn: config.authentication.refreshTokenExpireTime }
  );

  const hashedNewRefreshToken = await bcrypt.hash(refreshToken, 10);
  await usersService.updateUserRefreshToken(user.id, hashedNewRefreshToken);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
};
