import { z } from "zod";
import { fieldsMappingSchema } from "./fields-mapping-records/fieldsMappingSchema";
import { tagConfigSchema } from "../../request-records/kommoRequests/tagConfigSchema";

export const kommoMapSchema = z.object({
    contactMappingEnabled: z.boolean(),
    contactMappingKeys: fieldsMappingSchema,
    leadCardMappingEnabled: z.boolean(),
    leadCardMappingKeys: fieldsMappingSchema,
    tagConfig: tagConfigSchema.nullable(),
}).strict().nullable();