import "express-async-errors"
import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";
import { User } from "../interfaces";


const emailExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const email: string = req.body.email;
    const queryString: string = `
    SELECT "email"
    FROM users
    WHERE LOWER("email") = LOWER($1);
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [email],
    };
    const queryResult: QueryResult = await client.query(queryConfig);
    const foundEmail: string | undefined = queryResult.rows[0]

    if (!foundEmail) {
        return next();
    } else {
        throw new AppError("Email already registered", 409)
    }
};

const idExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const id: number = Number(req.params.userId) || Number(req.params.id);
    const errorMessage = req.params.userId ? 
    "User/course not found" : "User not found.";
    
    const queryString: string = `
    SELECT *
    FROM users
    WHERE "id" = $1;
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };
    const queryResult = await client.query(queryConfig);
    const user: User = queryResult.rows[0];
    if (user) {
        res.locals.user = user;
        return next();
    } else {
        throw new AppError(errorMessage, 404);
    };
};

export default { emailExists, idExists };