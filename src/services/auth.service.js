import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../configs/index.config.js";
import * as usersService from "../services/users.service.js";
import {
  BadRequestException,
  ConflictException,
  NotFoundException
} from "../utils/exceptions.util.js";

export const register = async (username, password) => {
  const existingUser = await usersService.findOneByUsername(username);
  if (existingUser) {
    throw new ConflictException(
      `user with username: ${username} already exists`
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await usersService.createUser(username, hashedPassword);
};

export const login = async (username, password) => {
  const user = await usersService.findOneByUsername(username);
  if (!user) {
    throw new NotFoundException(`user with username: ${username} not found`);
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new BadRequestException("incorrect password");
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
    throw new BadRequestException("incorrect refreshToken");
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
