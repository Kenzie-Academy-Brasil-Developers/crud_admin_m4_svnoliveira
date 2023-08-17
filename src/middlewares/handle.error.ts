import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { AppError } from "../errors";
import { ZodError } from "zod";


const error = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    };

    if (err instanceof ZodError) {
        const zodError = err.flatten().fieldErrors;
        return res.status(400).json(zodError);
    };
    
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
};

export default { error };