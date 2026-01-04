import axios from 'axios';
// import dotenv from 'dotenv';
const getCustomFieldsRoute = `https://betterspeakers.kommo.com/api/v4/leads/custom_fields`;

// dotenv.config();

export default async function getCustomFields() {
    const response = await axios.get(getCustomFieldsRoute, {
        headers: {
            Authorization: `Bearer ${process.env.KOMMO_API_KEY}`,
            Accept: 'application/json',
        },
    });
    return response.data;
}