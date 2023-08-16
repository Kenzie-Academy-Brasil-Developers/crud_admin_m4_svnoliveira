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
    const id: number = Number(req.body.developerId) || Number(req.params.id);
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
        throw new AppError("Course not found.", 404);
    };
};

export default { idExists };