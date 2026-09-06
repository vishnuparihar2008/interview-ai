import { Router } from "express";
import authControllers from "../controllers/auth.controller.js";
import authMiddlewares from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access public
 */
authRouter.post("/register", authControllers.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login an existing user
 * @access public
 */
authRouter.post("/login", authControllers.loginUserController);

/**
 * @route POST /api/auth/logout
 * @description clear token from user's cookies and add the token in blacklist
 * @access public
 */
authRouter.post("/logout", authControllers.logoutUserController);

/**
 * @route POST /api/auth/get-me
 * @description get the current Logged In user's details
 * @access private
 */
authRouter.get(
  "/get-me",
  authMiddlewares.authUser,
  authControllers.getMeController,
);

export default authRouter;
