import "express-async-errors"
import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";
import { Course } from "../interfaces";

const idExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const id: number = Number(req.params.courseId) || Number(req.params.id);
    const errorMessage = req.params.courseId ? 
    "User/course not found" : "Course not found.";
    
    const queryString: string = `
    SELECT *
    FROM courses
    WHERE "id" = $1;
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };
    const queryResult = await client.query(queryConfig);
    const course: Course = queryResult.rows[0];
    if (course) {
        res.locals.course = course;
        return next();
    } else {
        throw new AppError(errorMessage, 404);
    };
};

const isEnrolled = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const userId: number = Number(req.params.userId);
    const courseId: number = Number(req.params.userId);
    
    const queryString: string = `
    SELECT *
    FROM "userCourses"
    WHERE "userId" = $1
    AND "courseId" = $2;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [ userId, courseId ],
    };
    const queryResult = await client.query(queryConfig);
    const course: Course = queryResult.rows[0];
    if (course) {
        res.locals.enrollmentId = course.id;
    };

    return next();
};

export default { idExists, isEnrolled };