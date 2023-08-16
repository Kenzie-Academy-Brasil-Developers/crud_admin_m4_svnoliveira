import { z } from 'zod';

const userSchema = z.object({
    name: z.string().nonempty().max(50),
    email: z.string().email().max(50),
    password: z.string().nonempty().max(120),
    admin: z.boolean().optional()
});

const userReturnSchema = userSchema.pick({
    name: true, 
    email: true
}).extend({
    id: z.number(), 
    admin: z.boolean()
});

export { userSchema, userReturnSchema };