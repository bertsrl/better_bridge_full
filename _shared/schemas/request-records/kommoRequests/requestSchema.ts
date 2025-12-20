import { z } from "zod";
import { requestPayloadSchema } from "./requestPayloadSchema";

/**
 * @schema kommoRequestSchema
 * @description Schema for a request to Kommo
 * @example
 * {
 *      "endpoint": "/users/123",
 *      "method": "POST",
 *      "payload": <z.infer<typeof fieldsMappingSchema>>{...}
 * }
 */
export const hubspotRequestSchema = z.object({
    endpoint: z.string(),
    method: z.string(),
    payload: requestPayloadSchema,
}).strict();

export const kommoRequestSchema = z.object({
    endpoint: z.string(),
    method: z.string(),
    payload: requestPayloadSchema,
}).strict();


//general request schema
export const requestSchema = kommoRequestSchema || hubspotRequestSchema;