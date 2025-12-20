import axios from 'axios';

const getTagsRoute = `https://betterspeakers.kommo.com/api/v4/leads/tags`;

    export default async function getTags() {
        const response = await axios.get(getTagsRoute, {
            headers: {  
                Authorization: `Bearer ${process.env.KOMMO_API_KEY}`,
                Accept: 'application/json',
            },
        });
    return response.data;       
}