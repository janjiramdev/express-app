import * as usersService from "../services/users.service.js";

export const getProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { username } = await usersService.findOneById(id);
    return res.status(200).json({ id, username });
  } catch (err) {
    const message = err.message ?? JSON.stringify(err);
    const statusCode = err.statusCode ?? 500;
    return res.status(statusCode).json(message);
  }
};
