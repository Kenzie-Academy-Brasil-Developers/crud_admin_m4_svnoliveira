import { courseService } from "../services";
import { Request, Response } from "express";

const create = async (req: Request, res: Response): Promise<Response> => {
    const course = await courseService.create(req.body);
    return res.status(201).json(course);
};

export default { create };