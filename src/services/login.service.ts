import { QueryConfig } from "pg";
import { sign } from "jsonwebtoken";
import "dotenv/config";
import { client } from "../database";
import { Login, Token, UserResult } from "../interfaces";
import { AppError } from "../errors";
import { compareSync } from "bcryptjs";

const login = async (payload: Login): Promise<Token> => {
    const { email, password } = payload;

    const queryString: string = `
        SELECT * 
        FROM "users"
        WHERE "email" = $1;
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [email]
    };

    const queryResult: UserResult = await client.query(queryConfig);
    const user = queryResult.rows[0];

    if (!user) {
        throw new AppError("Wrong email/password", 401);
    };

    const passwordIsValid: boolean = compareSync(password, user.password);
    if (!passwordIsValid) {
        throw new AppError("Wrong email/password", 401);
    };

    const token = sign({
        email: user.password,
        admin: user.admin
    }, String(process.env.SECRET_KEY), {
        expiresIn: process.env.EXPIRES_IN, subject: String(user.id)
    } )
    return { token: token };
};

export default { login };