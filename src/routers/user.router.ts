import { Router } from "express";
import { bodyMiddleware, verifyUserMiddleware } from "../middlewares";
import { userSchema } from "../schemas";
import { userController } from "../controllers";


const userRouter: Router = Router();

userRouter.post("",
    bodyMiddleware.validate(userSchema),
    verifyUserMiddleware.emailExists,
    userController.create
);

export default userRouter;