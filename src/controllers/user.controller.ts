import { userService } from "../services";
import { Request, Response } from "express";

const create = async (req: Request, res: Response): Promise<Response> => {
    const user = await userService.create(req.body);
    return res.status(201).json(user);
};

export default { create };