import {Router} from "express";

const userRouter = Router();
import {UsersController} from "../controllers/UsersController";
import {IsAuthentication} from "../middlewares/isAuthentication";
const userController = new UsersController();

userRouter.use(IsAuthentication)
userRouter.post("/", userController.create);
userRouter.get("/", userController.all);
userRouter.get("/:id", userController.find);
userRouter.delete("/:id", userController.destroy);
userRouter.put("/:id", userController.update);

export {userRouter};