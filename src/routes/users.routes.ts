import {Router} from "express";
import {UsersController} from "../controllers/UsersController";
import {IsAuthentication} from "../middlewares/isAuthentication";
import uploadConfig from "../util/Upload"
import multer from "multer";
const upload = multer(uploadConfig)
const userRouter = Router();
const userController = new UsersController();

userRouter.use(IsAuthentication)
userRouter.post("/", userController.create);
userRouter.get("/", userController.all);
userRouter.get("/:id", userController.find);
userRouter.delete("/:id", userController.destroy);
userRouter.put("/:id", userController.update);
userRouter.patch("/avatar", upload.single("upload"),  userController.avatar);
export {userRouter};
