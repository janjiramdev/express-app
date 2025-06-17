import * as usersRepository from "../repositories/users.repository.js";

export const findOneById = async (id) => {
  const user = await usersRepository.findUserById(id);
  if (!user) {
    const error = new Error(`user with id: ${id} not found`);
    error.statusCode = 404;
    throw error;
  }
  return user;
};

export const findOneByUsername = async (username) => {
  const user = await usersRepository.findUserByUsername(username);
  return user;
};

export const createUser = async (username, password) => {
  return await usersRepository.createUser(username, password);
};

export const updateUserRefreshToken = async (id, refreshToken) => {
  await usersRepository.findUserByIdAndUpdate(id, { refreshToken });
};
