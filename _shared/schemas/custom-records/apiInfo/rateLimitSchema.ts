import { z } from "zod"

export const rateLimitSchema = z.object({
    requestsPerMinute: z.number(),
    requestsPerHour: z.number(),
}).strict();