import axios from 'axios';

const kommoApiToken = import.meta.env.KOMMO_API_TOKEN;

const getPipelinesRoute = `http://localhost:8080/api/v1/discoverer-api/kommo/get-pipelines`;

export default async function getPipelines() {
    const response = await axios.get(getPipelinesRoute, {
        headers: {
            Authorization: `Bearer ${kommoApiToken}`,
            Accept: 'application/json',
        },
    });

    if (response.status !== 200) {
        console.error('Error getting pipelines:', response.data);
        return null;
    }
    
    return response.data;
}