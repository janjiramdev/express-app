import express from "express";
import * as authController from "../controllers/auth.controller.js";
import requestValidator from "../middlewares/request-validator.middelware.js";
import * as validators from "../middlewares/validators/auth.validator.js";

const router = express.Router();

router.post(
  "/register",
  validators.registerValidator,
  requestValidator,
  authController.register
);
router.post(
  "/login",
  validators.loginValidator,
  requestValidator,
  authController.login
);
router.post(
  "/refresh-tokens",
  validators.refreshTokensValidator,
  authController.refreshTokens
);

export default router;
