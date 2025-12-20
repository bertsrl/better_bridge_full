import axios from "axios";
import { requestSchema } from "PARENT_DIR/_shared/schemas/request-records/kommoRequests/requestSchema";
import { z } from "zod";
import { getEnv } from "PARENT_DIR/_shared/env";

export default async function addLead(request: z.infer<typeof requestSchema>) {
    const insertLeadRouter = request.endpoint;
    const payload = [{
        name: request.payload.leadCardName,
        pipeline_id: request.payload.pipelineId,
        custom_fields_values: request.payload.leadCardCustomFieldsValues,
        tags_to_add: request.payload.tagIds.map(tagId => ({
            id: tagId,
        })),
    }]

    console.log("🔍 addLead Payload:", JSON.stringify(payload, null, 2));

    const response = await axios.post(insertLeadRouter, payload, {
        headers: {
            Authorization: `Bearer ${getEnv()['KOMMO_API_TOKEN']}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    if (response.status !== 201 && response.status !== 200) {
        console.error('Error adding lead:', response.data);
        return null;
    }

    return response.data;
}