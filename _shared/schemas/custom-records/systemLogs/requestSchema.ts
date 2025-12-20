import { z } from "zod";

export const requestSchema = z.object({
    method: z.string(),
    path: z.string(),
    headers: z.record(z.string(), z.any()),
    body: z.record(z.string(), z.any()),
    ip: z.string(),
    userAgent: z.string().optional(),
}).strict();