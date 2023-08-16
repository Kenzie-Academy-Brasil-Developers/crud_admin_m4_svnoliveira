import format from "pg-format";

import { client } from "../database";
import { Course, CourseCreate, CourseResult } from "../interfaces";

const create = async (payload: CourseCreate): Promise<Course> => {
    const queryFormat: string = format(
        `
        INSERT INTO courses (%I)
        VALUES (%L)
        RETURNING *;
        `,
        Object.keys(payload),
        Object.values(payload)
    );
    const queryResult: CourseResult = await client.query(queryFormat);
    return queryResult.rows[0];
};

export default { create };