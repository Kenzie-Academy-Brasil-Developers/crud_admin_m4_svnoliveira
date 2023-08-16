import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { ZodTypeAny } from "zod";


const validate = (schema: ZodTypeAny) => (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const validated = schema.parse(req.body);
    req.body = validated;
    return next();
};

export default { validate };