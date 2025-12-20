import axios from 'axios';
import { getEnv } from "PARENT_DIR/_shared/env";

const getUsersRoute = `https://betterspeakers.kommo.com/api/v4/users`;

    export default async function getUsers() {
        const response = await axios.get(getUsersRoute, {
            headers: {  
                Authorization: `Bearer ${getEnv()['KOMMO_API_TOKEN']}`,
                Accept: 'application/json',
            },
        });

    if (response.status !== 200) {
        console.error('Error getting users:', response.data);
        return null;
    }

    const usersRaw = response.data._embedded.users;
    const users: Record<string, string> = {};
    for (const user of usersRaw) {
        const userId = user.id;
        const fullName = user.full_name;
        users[`${fullName}`] = userId;
    }

    return users;
}