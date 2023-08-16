import { z } from 'zod';

const userSchema = z.object({
    name: z.string().nonempty().max(50),
    email: z.string().email().max(50),
    password: z.string().nonempty().max(120),
    admin: z.boolean().optional()
});

export default userSchema;