import { z } from "zod";

export const integrationsSchema = z.object({
    kommo: z.object({
        success: z.boolean(),
        responseTime: z.number(),
    }),
    hubspot: z.object({
        success: z.boolean(),
        responseTime: z.number(),
    }),
    betterbot: z.object({
        success: z.boolean(),
        responseTime: z.number(),
    }),
    spreadsheets: z.object({
        success: z.boolean(),
        responseTime: z.number(),
    }),
}).strict();