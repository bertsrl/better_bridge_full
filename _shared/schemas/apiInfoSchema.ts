import { z } from "zod";
import { sourceConfigSchema } from "./custom-records/apiInfo/sourceConfigSchema";
import { rateLimitSchema } from "./custom-records/apiInfo/rateLimitSchema";
import { kommoMapSchema } from "./custom-records/apiInfo/kommoMapSchema";
import { hubspotMapSchema } from "./custom-records/apiInfo/hubspotMapSchema";

export const apiInfoSchema = z.object({
    id: z.string().min(1),
    endpoint: z.string().min(1),
    method: z.string().min(1),
    enabled: z.boolean(),
    module: z.string().min(1),
    lastRun: z.date().nullable(),
    customerEmail_field_id: z.string().min(1),
    customerPhone_field_id: z.string().min(1),
    pipeline_id: z.number().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
    createdAt: z.date().nullable(), // Replace with z.custom<Timestamp>() if you use Firestore Timestamp, or adjust as needed
    updatedAt: z.date().nullable(), // Replace with z.custom<Timestamp>() if you use Firestore Timestamp
    version: z.string().min(1),
    sourceConfig: sourceConfigSchema,
    rateLimit: rateLimitSchema,
    kommo_map: kommoMapSchema,
    hubspot_map: hubspotMapSchema,
}).strict();