import { z } from "zod";
import { fieldsMappingSchema } from "./fields-mapping-records/fieldsMappingSchema";

export const hubspotMapSchema = z.object({
    segmentListIdAdded: z.boolean(),
    segmentColumnsMappingKeys: fieldsMappingSchema,
}).strict();