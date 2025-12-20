import { z } from "zod";

export const responseSchema = z.object({
    statusCode: z.number(),
    body: z.record(z.string(), z.any()),
    duration: z.number(), // Response time in ms
}).strict();