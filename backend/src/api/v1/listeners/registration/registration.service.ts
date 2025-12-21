import { mapBridgeKommo } from '@/features/MapBridge/mapBridgeFn';
import { Injectable } from '@nestjs/common';
import { getApiInfo } from '@/features/Discoverer/DBOps/getApiInfo';
import z from 'zod';
import { kommoRequestSchema } from 'PARENT_DIR/_shared/schemas/request-records/kommoRequests/requestSchema';
import { apiInfoSchema } from 'PARENT_DIR/_shared/schemas/apiInfoSchema';
import { requestPayloadSchema } from 'PARENT_DIR/_shared/schemas/request-records/kommoRequests/requestPayloadSchema';
import { KommoRequestor, GetRequest } from '@/features/RequestExecutor/kommo/kommoRequestor';

@Injectable()
export class RegistrationService {
    constructor() { }
    
    async register(pathParam: string, rawRequest: string) {
        // 1. get the API Info from db
        const apiInfoArray = await getApiInfo(pathParam);
        const apiInfo = apiInfoArray[0] as z.infer<typeof apiInfoSchema>;

        const DEFINED_PIPELINE_ID = apiInfo.pipeline_id;
        const DEFINED_TAG_CONFIG = apiInfo.kommo_map.tagConfig;

        // start working on the request
        // 2. get the raw request
        const formData = rawRequest;

        console.log('🔍 CustomAPIService.createCustomAPI called:', rawRequest);

        if (!apiInfo) {
            throw new Error('API Info not found');
        } 
        
        console.log('🔍 apiInfo arrival:', apiInfo);

        // 4. Build a payload that will contain our mapped fields
        const fieldsAndTagsMapped = await mapBridgeKommo(
            formData,
            apiInfo.kommo_map,
            DEFINED_TAG_CONFIG
        ) as z.infer<typeof requestPayloadSchema>;

        console.log('🔍 lead card custom fields values: ', fieldsAndTagsMapped.leadCardCustomFieldsValues);
        console.log('🔍 contact custom fields values: ', fieldsAndTagsMapped.contactCustomFieldsValues);

        const insertLeadRoute = `https://betterspeakers.kommo.com/api/v4/leads`;

        const requests:z.infer<typeof kommoRequestSchema>[] = [{
            endpoint: insertLeadRoute,
            method: apiInfo.method,
            payload: {
                pipelineId: DEFINED_PIPELINE_ID,
                // TODO: Tags should be used in the future outputd
                // depending on what we need, we should have a dir 
                // that contains all custom functions that we are 
                // building to generate the tags                
                tagIds: fieldsAndTagsMapped.tagIds, 
                leadCardName: fieldsAndTagsMapped.leadCardName,
                leadCardCustomFieldsValues: fieldsAndTagsMapped.leadCardCustomFieldsValues,
                contactCustomFieldsValues: fieldsAndTagsMapped.contactCustomFieldsValues,
            }
        }]

        // 5. Initiate RequestExecutor:KommoRequestor
        const requestExecutor = new KommoRequestor();
        requestExecutor.loadDataIntoRequestor(new GetRequest(requests[0]));
        const response = await requestExecutor.execute();

        return {
            message: 'API found',
            formData: formData,
            apiInfo: apiInfo,
            fieldsAndTagsMapped: fieldsAndTagsMapped,
            requestsComposed: requests,
            executorResponse: response,
        }
    }
}