import { z } from 'zod';

const courseSchema = z.object({
    name: z.string().nonempty().max(15),
    description: z.string().nonempty(),
});

export default courseSchema;