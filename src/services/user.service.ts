import format from "pg-format";
import { User, UserCreate, UserResult } from "../interfaces";
import { client } from "../database";

const create = async (payload: UserCreate): Promise<User> => {
    const queryFormat: string = format(
        `
        INSERT INTO users (%I)
        VALUES (%L)
        RETURNING *;
        `,
        Object.keys(payload),
        Object.values(payload)
    );
    const queryResult: UserResult = await client.query(queryFormat);
    return queryResult.rows[0];
};

export default { create };