import axios from "axios";
import { getEnv } from "PARENT_DIR/_shared/env";

const leadsRoute = `https://betterspeakers.kommo.com/api/v4/leads`;

export default async function getLeads() {
    const response = await axios.get(leadsRoute, {
        headers: {
            Authorization: `Bearer ${getEnv()['KOMMO_API_TOKEN']}`,
            Accept: 'application/json',
        },
    });

    if (response.status !== 200) {
        console.error('Error getting leads:', response.data);
        return null;
    }

    const leadsRaw = response.data._embedded.leads;
    const leads: Record<string, string> = {};
    for (const lead of leadsRaw) {
        const leadId = lead.id;
        const leadName = lead.name;
        leads[`${leadName}`] = leadId;
    }

    return leads;
}