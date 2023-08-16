import { z } from "zod";
import { loginSchema, userSchema } from "../schemas";
import { QueryResult } from "pg";


type UserCreate = z.infer<typeof userSchema>;
type User = UserCreate & { id: number };
type UserResult = QueryResult<User>;
type Login = z.infer<typeof loginSchema>;

export  { UserCreate, Login, User, UserResult };