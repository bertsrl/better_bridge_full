import { z } from 'zod';

export const PSDemoFormEntry = z.object({ 
    id: z.string(), // UUID
    name: z.string(), // name
    email: z.string(),
    phone: z.string(), // phone number
    message: z.string(), // message
    createdAt: z.date(), // created at
    updatedAt: z.date(), // updated at
});

export type PSDemoFormEntry = z.infer<typeof PSDemoFormEntry>;