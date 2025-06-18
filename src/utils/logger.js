import winston from "winston";

export default function createLogger(context = "ExpressApplication") {
  const logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}] [${context}]: ${message}`;
      })
    ),
    transports: [new winston.transports.Console()]
  });

  return {
    info: (message) => logger.info(message),
    error: (message) => logger.error(message)
  };
}
