import createLogger from "../../utils/logger.util.js";

export const requestLogger = (req, _res, next) => {
  const logger = createLogger("HttpRequest");
  const { method, originalUrl, params, query, body } = req;

  logger.info(
    `[${method}] ${originalUrl}, params: ${JSON.stringify(params)}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body ?? {})}`
  );
  next();
};

export const responseLogger = (req, res, next) => {
  const logger = createLogger("HttpResponse");
  const originalSend = res.send;

  res.send = function (body) {
    const isError = res.statusCode >= 400;
    const message = !isError ? JSON.parse(body)?.data : JSON.parse(body)?.error;

    logger.info(
      `[${req.method}] ${req.originalUrl}, ${!isError ? "body:" : "error:"} ${JSON.stringify(message)}}`
    );
    return originalSend.call(this, body);
  };

  next();
};
