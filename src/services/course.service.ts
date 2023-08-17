import format from "pg-format";
import { client } from "../database";
import { Course, CourseCreate, CourseResult, CourseWithUser, CourseWithUserResult } from "../interfaces";
import { QueryConfig } from "pg";
import { AppError } from "../errors";

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

const read = async (): Promise<Course[]> => {
    const queryString: string = `
        SELECT *
        FROM "userCourses";
    `;
    const queryResult: CourseResult = await client.query(queryString);
    return queryResult.rows;
};

const readUsers = async (courseId:number): Promise<CourseWithUser[]> => {
    const queryString: string = `
        SELECT 
            u."id" "userId",
            u."name" "userName",
            c."id" "courseId", 
            c."name" "courseName", 
            c."description" "courseDescription",
            uc."active" "userActiveInCourse"
        FROM 
            "users" u
        JOIN 
            "userCourses" uc ON u."id" = uc."courseId"
        JOIN
            "courses" c ON c."id" = uc."courseId"
        WHERE c."id" = $1;
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [courseId]
    };
    const queryResult: CourseWithUserResult = await client.query(queryConfig);
    const userList = queryResult.rows;
    // if (userList.length < 1){
    //     throw new AppError("No user found", 404);
    // };
    return userList;
};

const enroll = async (userId: number, courseId: number, enrollmentId?: number): Promise<void> => {

    if (enrollmentId) {
        const queryFormat: string = format(`
            UPDATE 
                "userCourses"
            SET ("active") = ROW(%L)
            WHERE 
                "id" = $1
            RETURNING *;`,
            Object.values({
                active: true
            })
        );
        const queryConfig: QueryConfig = {
            text: queryFormat,
            values: [enrollmentId]
        };
        await client.query(queryConfig);

    } else {
        const queryFormat: string = format(`
            INSERT INTO "userCourses" ("active", "userId", "courseId")
            VALUES (%L)
            RETURNING *;`,
            Object.values({
                active: true,
                userId: userId,
                courseId: courseId
            })
        );
        await client.query(queryFormat);
    };
};

const disenroll = async (userId: number, courseId: number): Promise<void> => {

    const queryFormat: string = format(`
        UPDATE 
            "userCourses"
        SET ("active") = ROW(%L)
        WHERE 
            "userId" = $1
        AND
            "courseId" = $2
        RETURNING *;`,
        Object.values({
            active: false
        })
    );

    const queryConfig: QueryConfig = {
        text: queryFormat,
        values: [userId, courseId]
    };

    await client.query(queryConfig);
};

export default { create, read, readUsers, enroll, disenroll };