// import { kommoRequestSchema } from "PARENT_DIR/_shared/schemas/request-records/kommoRequests/requestSchema";
// import { z } from "zod";
// import * as CallKommo from "../../Discoverer/callKommo/kommo/_index";

// /**
//  * @function composeKommoPayload
//  * @description fn that will compose the payload for the request
//  * @param kommoFieldsAndValuesMap - the map of the fields and values to be composed
//  * @returns z.infer<typeof customFieldValuesSchema>[]
//  */
// async function composeKommoPayload(
//     request: z.infer<typeof kommoRequestSchema>
// ): Promise<any> {
//     const pipelines = await CallKommo.getPipelines();
//     const pipelineId = pipelines[`${request.payload.pipelineName}`];
    
//     const leads = await CallKommo.getLeads();
//     const leadCardId = leads[`${request.payload.leadCardName}`];
    
//     const tags = await CallKommo.getTags();
//     const tagIds = [];
//     request.payload.tagNames?.forEach(async (tagName) => {
//         const tagId = tags[`${tagName}`];
//         tagIds.push(tagId);
//     });
    
//     // custom fields values for the payload mapped accordingly to Kommo API structure
//     const customFieldsValues = request.payload.customFieldsValues;
//     const customFieldsValuesStructured = [];

//     Object.entries(customFieldsValues).forEach(([key, value]) => {
//         customFieldsValuesStructured.push({
//             field_id: key,
//             values: [{ value: value }],
//         });
//     });

//     return {
//         pipelineId: pipelineId,
//         leadCardId: leadCardId,
//         tagIds: tagIds,
//         customFieldsValues: customFieldsValuesStructured,
//     };
// }

// /**
//  * fn that will take the configuration and will create an object of instance request for each request incoming from external sources
//  * and will call the execute method for each request
//  * @function processRequests
//  */
// export async function generateRequests(
//     requests: z.infer<typeof kommoRequestSchema>[],
// ): Promise<{ endpoint: string; method: string; payload: any }[]> { 
//     return Promise.all(requests.map(async (request: z.infer<typeof kommoRequestSchema>) => {
//         return {
//             endpoint: request.endpoint,
//             method: request.method,
//             payload: await composeKommoPayload(request),
//         }
//     }));
// }