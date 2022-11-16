import {Router} from "express";
import {userRouter} from "./users.routes";
import {authRouter} from "./auth.routes";

const routes = Router();
routes.use("/users", userRouter);
routes.use("/auth", authRouter);

export {routes}
