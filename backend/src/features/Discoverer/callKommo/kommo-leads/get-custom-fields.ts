import axios from 'axios';
import { getEnv } from "PARENT_DIR/_shared/env";

const getCustomFieldsRoute = `https://betterspeakers.kommo.com/api/v4/leads/custom_fields`;

export default async function getCustomFields() {
    const response = await axios.get(getCustomFieldsRoute, {
        headers: {
            Authorization: `Bearer ${getEnv()['KOMMO_API_TOKEN']}`,
            Accept: 'application/json',
        },
    });

    if (response.status !== 200) {
        console.error('Error getting custom fields:', response.data);
        return null;
    }

    const customFieldsRaw = response.data._embedded.custom_fields;
    const customFields: Record<string, string> = {};
    for (const customField of customFieldsRaw) {
        const customFieldId = customField.id;
        const customFieldName = customField.name;
        customFields[`${customFieldName}`] = customFieldId;
    }
    
    return customFields;
}