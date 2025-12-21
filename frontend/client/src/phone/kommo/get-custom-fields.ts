import axios from 'axios';

const kommoApiToken = import.meta.env.KOMMO_API_TOKEN;

const getCustomFieldsRoute = `http://localhost:8080/api/v1/discoverer-api/kommo/get-custom-fields`;

export default async function getCustomFields() {
    const response = await axios.get(getCustomFieldsRoute, {
        headers: {
            Authorization: `Bearer ${kommoApiToken}`,
            Accept: 'application/json',
        },
    });

    if (response.status !== 200) {
        console.error('Error getting custom fields:', response.data);
        return null;
    }
    
    return response.data;
}