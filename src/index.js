import express from "express";
import config from "./configs/index.config.js";
import router from "./routes/index.route.js";
import createLogger from "./utils/logger.js";

const logger = new createLogger();

const app = express();

app.use(express.json());
app.use("/", router);

app.listen(config.application.port, () => {
  logger.info(`application is running on port: ${config.application.port}`);
});
