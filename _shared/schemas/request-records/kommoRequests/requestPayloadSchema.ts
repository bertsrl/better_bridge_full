import { z } from "zod";
import { customFieldValuesSchema } from "./customFieldValuesSchema";

export const requestPayloadSchema = z.object({
    pipelineId: z.number().nullable(),
    // FIXME: Check these in the future because I think they should be already part of the customFieldsValues 
    // contactName: z.string().nullable(),
    // leadCardName: z.string().nullable(),
    // customerEmail_field_id: z.string().nullable(),
    // customerPhone_field_id: z.string().nullable(),
    tagIds: z.array(z.number()).nullable(),
    leadCardName: z.string().nullable(),
    leadCardCustomFieldsValues: customFieldValuesSchema.array().nullable(),
    contactCustomFieldsValues: customFieldValuesSchema.array().nullable(),
}).strict();