import * as usersService from "../services/users.service.js";
import createLogger from "../utils/logger.js";

const logger = new createLogger("UsersController");

export const getProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const { username } = await usersService.findOneById(id);

    logger.info(`getProfile success for user with id: ${id}`);
    return res.status(200).json({ data: { id, username }, statusCode: 200 });
  } catch (err) {
    const message = err.message ?? JSON.stringify(err);
    const statusCode = err.statusCode ?? 500;

    logger.error(`getProfile error: ${message}`);
    return res.status(statusCode).json({ message, statusCode });
  }
};
