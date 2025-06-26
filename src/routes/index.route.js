import express from "express";
import authRouter from "./auth.route.js";
import usersRouter from "./users.route.js";
import authentication from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", authentication, usersRouter);

export default router;
