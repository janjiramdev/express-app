import * as usersService from "../services/users.service.js";
import createLogger from "../utils/logger.js";

const logger = new createLogger("UsersController");

export const getProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await usersService.findOneById(id);
    // eslint-disable-next-line no-unused-vars
    const { password, refreshToken, ...externalUser } = user;

    logger.info(`getProfile success for user with id: ${externalUser.id}`);
    return res.status(200).json(externalUser);
  } catch (err) {
    const message = err.message ?? JSON.stringify(err);
    const statusCode = err.statusCode ?? 500;

    logger.error(`getProfile error: ${message}`);
    return res.status(statusCode).json({
      message,
      statusCode,
    });
  }
};
