import { Request, Response } from "express";
import { loginService } from "../services";
import { Token } from "../interfaces";


const login = async (req: Request, res: Response): Promise<Response> => {
    
    const token: Token = await loginService.login(req.body);    
    return res.status(200).json(token);
};

export default { login };