import axios from "axios";
import { getEnv } from "PARENT_DIR/_shared/env";

const contactsRoute = `https://betterspeakers.kommo.com/api/v4/contacts`;

export default async function getContacts() {
    const response = await axios.get(contactsRoute, {
        headers: {
            Authorization: `Bearer ${getEnv()['KOMMO_API_TOKEN']}`,
            Accept: 'application/json',
        },
    });

    if (response.status !== 200) {
        console.error('Error getting contacts:', response.data);
        return null;
    }

    const contactsRaw = response.data._embedded.contacts;
    const contacts: Record<string, string> = {};
    for (const contact of contactsRaw) {
        const contactId = contact.id;
        const contactName = contact.name;
        contacts[`${contactName}`] = contactId;
    }

    return contacts;
}