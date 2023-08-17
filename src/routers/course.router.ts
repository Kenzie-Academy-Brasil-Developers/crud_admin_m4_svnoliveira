import { Router } from "express";
import { bodyMiddleware, tokenMiddleware, verifyCourseMiddleware, verifyUserMiddleware } from "../middlewares";
import { courseSchema } from "../schemas";
import { courseController } from "../controllers";




const courseRouter: Router = Router();

courseRouter.post("",
    bodyMiddleware.validate(courseSchema),
    tokenMiddleware.validate,
    tokenMiddleware.isAdmin,
    courseController.create
);

courseRouter.get("",
    courseController.read
);

courseRouter.get("/:id/users",
    tokenMiddleware.validate,
    tokenMiddleware.isAdmin,
    verifyCourseMiddleware.idExists,
    courseController.readUsers
);

courseRouter.post("/:courseId/users/:userId",
    tokenMiddleware.validate,
    tokenMiddleware.isAdmin,
    verifyUserMiddleware.idExists,
    verifyCourseMiddleware.idExists,
    verifyCourseMiddleware.isEnrolled,
    courseController.enroll
);

courseRouter.delete("/:courseId/users/:userId",
    tokenMiddleware.validate,
    tokenMiddleware.isAdmin,
    verifyUserMiddleware.idExists,
    verifyCourseMiddleware.idExists,
    courseController.disenroll
);

export default courseRouter;