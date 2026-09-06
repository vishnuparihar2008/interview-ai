import { Router } from "express";
import authControllers from "../controllers/auth.controller.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authControllers.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login an existing user
 * @access Public
 */
authRouter.post("/login", authControllers.loginUserController);

export default authRouter;
