import express from "express";
import authRouter from "./auth.route.js";
import usersRouter from "./users.route.js";
import authenticationGuard from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", authenticationGuard, usersRouter);

export default router;
