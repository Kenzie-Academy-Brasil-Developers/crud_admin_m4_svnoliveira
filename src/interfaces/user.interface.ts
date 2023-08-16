import { z } from "zod";
import { loginSchema, userReturnSchema, userSchema } from "../schemas";
import { QueryResult } from "pg";


type UserCreate = z.infer<typeof userSchema>;
type User = UserCreate & { id: number };
type UserResult = QueryResult<User>;
type UserReturn = z.infer<typeof userReturnSchema>;
type UserReturnResult = QueryResult<UserReturn>;

type UserWithCourse = {
    courseId: number,
    courseName: string,
    courseDescription: string,
    userActiveInCourse: boolean,
    userId: number,
    userName: string
};
type UserWithCourseResult = QueryResult<UserWithCourse>;

type Login = z.infer<typeof loginSchema>;
type Token = { token: string };

export  { 
    UserCreate, 
    User, 
    UserResult, 
    UserReturn, 
    UserReturnResult,
    UserWithCourse,
    UserWithCourseResult, 
    Login, 
    Token 
};