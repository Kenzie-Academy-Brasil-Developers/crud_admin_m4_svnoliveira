import { Router } from "express";
import { bodyMiddleware, verifyCourseMiddleware } from "../middlewares";
import { courseSchema } from "../schemas";
import { courseController } from "../controllers";




const courseRouter: Router = Router();

courseRouter.post("",
    bodyMiddleware.validate(courseSchema),
    courseController.create
);

export default courseRouter;