import axios from 'axios';

const kommoApiToken = import.meta.env.KOMMO_API_TOKEN;

const getTagsRoute = `http://localhost:8080/api/v1/discoverer-api/kommo/get-tags`;

export default async function getTags() {
    const response = await axios.get(getTagsRoute, {
        headers: {
            Authorization: `Bearer ${kommoApiToken}`,
            Accept: 'application/json',
        },
    });

    if (response.status !== 200) {
        console.error('Error getting tags:', response.data);
        return null;
    }
    
    return response.data;
}