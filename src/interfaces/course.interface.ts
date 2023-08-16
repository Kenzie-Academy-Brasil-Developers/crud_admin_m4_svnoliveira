import { z } from "zod";
import { courseSchema } from "../schemas";
import { QueryResult } from "pg";

type CourseCreate = z.infer<typeof courseSchema>;
type Course = CourseCreate & { id: number };
type CourseResult = QueryResult<Course>;

export  { CourseCreate, Course, CourseResult };