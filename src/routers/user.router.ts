import { Router } from "express";
import { bodyMiddleware, tokenMiddleware, verifyUserMiddleware } from "../middlewares";
import { userSchema } from "../schemas";
import { userController } from "../controllers";


const userRouter: Router = Router();

userRouter.post("",
    bodyMiddleware.validate(userSchema),
    verifyUserMiddleware.emailExists,
    userController.create
);

userRouter.get("",
    tokenMiddleware.validate,
    tokenMiddleware.isAdmin,
    userController.read
);

userRouter.get("/:id/courses",
    tokenMiddleware.validate,
    tokenMiddleware.isAdmin,
    verifyUserMiddleware.idExists,
    userController.readCourses
);

export default userRouter;