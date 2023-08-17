import { z } from "zod";
import { courseSchema } from "../schemas";
import { QueryResult } from "pg";

type CourseCreate = z.infer<typeof courseSchema>;
type Course = CourseCreate & { id: number };
type CourseResult = QueryResult<Course>;

type CourseWithUser = {
    userId: number,
    userName: string,
    courseId: number,
    courseName: string,
    courseDescription: string,
    userActiveInCourse: boolean
};
type CourseWithUserResult = QueryResult<CourseWithUser>;

export  { 
    CourseCreate, 
    Course, 
    CourseResult, 
    CourseWithUser, 
    CourseWithUserResult 
};