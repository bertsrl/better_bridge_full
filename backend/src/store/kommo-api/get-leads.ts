import axios from "axios";

const leadsRoute = `https://betterspeakers.kommo.com/api/v4/leads`;

export default async function getLeads() {
    const response = await axios.get(leadsRoute, {
        headers: {
            Authorization: `Bearer ${process.env.KOMMO_API_KEY}`,
            Accept: 'application/json',
        },
    });

    if (response.status !== 200) {
        console.error('Error getting leads:', response.data);
        return null;
    }

    return response.data;
}