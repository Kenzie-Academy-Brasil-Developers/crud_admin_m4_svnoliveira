import { hashSync } from "bcryptjs";
import { UserCreate } from "../interfaces";
import { userService } from "../services";
import { Request, Response } from "express";

const create = async (req: Request, res: Response): Promise<Response> => {
    const payload: UserCreate = req.body;
    payload.password = hashSync(payload.password, 10);

    const user = await userService.create(payload);

    return res.status(201).json(user);
};

const read = async (req: Request, res: Response): Promise<Response> => {
    const userList = await userService.read();
    return res.status(200).json(userList);
};

const readCourses = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.id);
    const courseList = await userService.readCourses(id);
    return res.status(200).json(courseList);
};

export default { create, read, readCourses };