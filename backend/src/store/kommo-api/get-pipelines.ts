import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const pipelinesRoute = `https://betterspeakers.kommo.com/api/v4/leads/pipelines`;

export default async function getPipelines() {
    const response = await axios.get(pipelinesRoute, {
        headers: {
            Authorization: `Bearer ${process.env.KOMMO_API_KEY}`,
            Accept: 'application/json',
        },
    });

    if (response.status !== 200) {
        console.error('Error getting pipelines:', response.data);
        return null;
    }

    return response.data;
}