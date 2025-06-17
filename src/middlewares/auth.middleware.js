import jwt from "jsonwebtoken";
import config from "../configs/index.config.js";
import * as middlewareConstant from "../constants/middleware.constant.js";
import createLogger from "../utils/logger.js";

const logger = new createLogger("AuthenticationGuard");

export default function authenticationGuard(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith("Bearer"))
    return res.status(401).json({
      message: "jwt malformed",
      statusCode: 401,
    });

  const token = authorization && authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({
      message: "jwt malformed",
      statusCode: 401,
    });

  try {
    const decodedToken = jwt.verify(
      token,
      config.authentication.accessTokenSecret
    );
    req.user = decodedToken;
    next();
  } catch (err) {
    const message = err.message ?? JSON.stringify(err);
    let statusCode = err.statusCode ?? 500;
    if (middlewareConstant.jwtErrorList.includes(message)) statusCode = 401;

    logger.error(`authentication error: ${message}`);
    return res.status(statusCode).json({
      message,
      statusCode,
    });
  }
}
