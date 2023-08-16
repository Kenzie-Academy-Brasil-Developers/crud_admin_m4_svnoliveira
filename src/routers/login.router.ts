import { Router } from "express";
import { loginSchema } from "../schemas";
import { bodyMiddleware } from "../middlewares";
import loginController from "../controllers/login.controller";

const loginRouter: Router = Router();

loginRouter.post("",
    bodyMiddleware.validate(loginSchema),
    loginController.login
);

export default loginRouter;