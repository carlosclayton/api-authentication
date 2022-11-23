import {Router} from "express";

const authRouter = Router();
import {AuthController} from "../controllers/AuthController";
const authController = new AuthController();

authRouter.post("/login", authController.login);
authRouter.post("/refresh_token", authController.refresh_token);
authRouter.post("/forgot", authController.forgot);
authRouter.post("/reset", authController.reset);
export {authRouter};

