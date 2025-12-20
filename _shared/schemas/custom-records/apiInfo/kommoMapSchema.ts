import { z } from "zod";
import { fieldsMappingSchema } from "./fields-mapping-records/fieldsMappingSchema";

export const kommoMapSchema = z.object({
    contactMappingEnabled: z.boolean(),
    contactMappingKeys: fieldsMappingSchema,
    leadCardMappingEnabled: z.boolean(),
    leadCardMappingKeys: fieldsMappingSchema,
}).strict();