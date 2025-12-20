import { z } from "zod"

export const sourceConfigSchema = z.object({
    allowedDomains: z.array(z.string()),
    allowedJotformIds: z.array(z.string()),
    requiredHeaders: z.record(z.string(), z.string()),
    payloadSchema: z.record(z.string(), z.any()).optional(), // Accepts any object (adjust to stricter schema if necessary)
}).strict();