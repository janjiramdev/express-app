import express from "express";
import config from "./configs/index.config.js";
import router from "./routes/index.route.js";
import createLogger from "./utils/logger.util.js";
import responseInterceptor from "./middlewares/interceptors/response.interceptor.js";
import {
  requestLogger,
  responseLogger
} from "./middlewares/interceptors/logger.interceptor.js";

const logger = createLogger();

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(responseLogger);
app.use(responseInterceptor);
app.use("/", router);

app.listen(config.application.port, () => {
  logger.info(`application is running on port: ${config.application.port}`);
});
