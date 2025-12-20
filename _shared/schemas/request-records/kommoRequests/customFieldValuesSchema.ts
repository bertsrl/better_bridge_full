import { z } from "zod";

/**
 * Schema for custom field values
 * @schema customFieldValuesSchema
 * @description Schema for custom field values
 * @example
 * {
 *      "field_id": "123",
 *      "values": [{ "value": "John Doe" }]
 * }
 */
export const customFieldValuesSchema = z.object({
    field_id: z.number(),
    values: z.array(z.object({
        value: z.string(),
    })),
}).array();