import { courseService } from "../services";
import { Request, Response } from "express";

const create = async (req: Request, res: Response): Promise<Response> => {
    const course = await courseService.create(req.body);
    return res.status(201).json(course);
};

const read = async (req: Request, res: Response): Promise<Response> => {
    const courseList = await courseService.read();
    return res.status(200).json(courseList);
};

const readUsers = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.id);
    const userList = await courseService.readUsers(id);
    return res.status(200).json(userList);
};

const enroll = async (req: Request, res: Response): Promise<Response> => {
    const userId = Number(req.params.userId);
    const courseId = Number(req.params.courseId);
    const enrollmentId: number | undefined = res.locals.enrollmentId ? res.locals.enrollmentId : undefined;

    await courseService.enroll( userId, courseId, enrollmentId );
    return res.status(201).json({ 
        message: "User successfully vinculed to course"
    });
};

const disenroll = async (req: Request, res: Response): Promise<Response> => {
    const userId = Number(req.params.userId);
    const courseId = Number(req.params.courseId);
    await courseService.disenroll( userId, courseId );
    return res.status(204).send();
};

export default { create, read, enroll, disenroll, readUsers };