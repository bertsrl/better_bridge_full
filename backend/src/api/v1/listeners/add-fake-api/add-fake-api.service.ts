import { Injectable } from '@nestjs/common';
import { app } from '@/firebase';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { apiInfoSchema } from 'PARENT_DIR/_shared/schemas/apiInfoSchema';
import { z } from 'zod';

const fakeApiData: z.infer<typeof apiInfoSchema> = {
    "id": "test-kommo-api",
    "endpoint": "api/v1/registration/test-kommo-api",
    "method": "POST",
    "module": "registration",
    "lastRun": null,
    "customerEmail_field_id": "",
    "customerPhone_field_id": "",
    "pipeline_id": 11918220,
    "name": "",
    "description": "",
    "enabled": true,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "version": "",
    "sourceConfig": {
        "allowedDomains": [],
        "allowedJotformIds": [],
        "requiredHeaders": {}
    },
    "rateLimit": {
        "requestsPerMinute": null,
        "requestsPerHour": null
    },
    "kommo_map": {
        "contactMappingEnabled": null,
        "contactMappingKeys": {},
        "leadCardMappingEnabled": null,
        "leadCardMappingKeys": {},
        "tagConfig": {
            "grade": {
                "addGradeTags": true,
                "formGradeFieldId": "jotform_clasa_cursantului",
                "gradeTagsMap": {
                    "Clasa a VII-a": 193766
                }
            },
            "module": {
                "addModuleIDTags": true,
                "moduleTagId": 89142
            },
            "studentLevel": {
                "addStudentLevelTags": false,
                "formGradeFieldId": "",
                "studentLevelTagsMap": {}
            },
            "group": {
                "addGroupTags": false,
                "formGroupFieldId": "",
                "groupTagsMap": {}
            },
            "segment": {
                "addSegmentTags": false,
                "segmentID": "Public Speaking",
                "segmentTagId": 0
            },
            "demoDay": {
                "addDemoDayTags": false,
                "formDemoDayFieldId": "",
                "demoDayTagsMap": {}
            }
        }
    },
    "hubspot_map": {
        "segmentListIdAdded": null,
        "segmentColumnsMappingKeys": {}
    }
} 

@Injectable()
export class AddFakeApiService {
    constructor() { }

    private apiInfoSchema = apiInfoSchema;

    async addFakeApi() {
        console.log('🔍 Adding fake API...');
        // const fakeApi = generateMock(apiInfoSchema);
        // const fakeApi = zocker(this.apiInfoSchema).generate();
        console.log('🔍 fakeApi: ', fakeApiData);

        // upload fakeApi to firestore apiInfo collection
        const db = getFirestore(app);
        const apiInfoCollection = collection(db, 'apiInfo');
        await addDoc(apiInfoCollection, fakeApiData);
        
        return fakeApiData;
    }
}