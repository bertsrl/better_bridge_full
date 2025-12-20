import axios from 'axios';
import { getEnv } from "PARENT_DIR/_shared/env";

const getTagsRoute = `https://betterspeakers.kommo.com/api/v4/leads/tags`;

    export default async function getTags() {
        const response = await axios.get(getTagsRoute, {
            headers: {  
                Authorization: `Bearer ${getEnv()['KOMMO_API_TOKEN']}`,
                Accept: 'application/json',
            },
        });

    if (response.status !== 200) {
        console.error('Error getting tags:', response.data);
        return null;
    }

    const tagsRaw = response.data._embedded.tags;
    const tags: Record<string, string> = {};
    for (const tag of tagsRaw) {
        const tagId = tag.id;
        const tagName = tag.name;
        tags[`${tagName}`] = tagId;
    }

    return tags;
}