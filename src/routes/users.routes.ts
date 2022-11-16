import {Router} from "express";

const userRouter = Router();
import {UsersController} from "../controllers/UsersController";
const userController = new UsersController();

userRouter.post("/", userController.create);
userRouter.get("/", userController.all);
userRouter.get("/:id", userController.find);
userRouter.delete("/:id", userController.destroy);
userRouter.put("/:id", userController.update);

export {userRouter};