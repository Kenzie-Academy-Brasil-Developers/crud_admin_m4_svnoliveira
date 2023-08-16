import format from "pg-format";
import { UserCreate, UserResult, UserReturn, UserReturnResult, UserWithCourse, UserWithCourseResult } from "../interfaces";
import { client } from "../database";
import { userReturnSchema } from "../schemas";
import { QueryConfig } from "pg";
import { AppError } from "../errors";

const create = async (payload: UserCreate): Promise<UserReturn> => {
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
    const user = queryResult.rows[0];
    const userReturn : UserReturn = userReturnSchema.parse(user);
    return userReturn;
};

const read = async (): Promise<UserReturn[]> => {
    const queryString: string = `
        SELECT 
        "id", "name", "email", "admin"
        FROM "users";
        `;
    const queryResult: UserReturnResult = await client.query(queryString);
    const userList = queryResult.rows;
    return userList;
};

const readCourses = async (userId:number): Promise<UserWithCourse[]> => {
    const queryString: string = `
        SELECT 
            c."id" "courseId", 
            c."name" "courseName", 
            c."description" "courseDescription",
            uc."active" "userActiveInCourse",
            u."id" "userId",
            u."name" "userName"
        FROM 
            "courses" c
        JOIN 
            "userCourses" uc ON c."id" = uc."courseId"
        JOIN
            "users" u ON u."id" = uc."userId"
        WHERE u."id" = $1;
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    };
    const queryResult: UserWithCourseResult = await client.query(queryConfig);
    const courseList = queryResult.rows;
    if (courseList.length < 1){
        throw new AppError("No course found", 404);
    };

    return courseList;
};

export default { create, read, readCourses };