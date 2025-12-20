import axios from 'axios';

const getUsersRoute = `https://betterspeakers.kommo.com/api/v4/users`;

    export default async function getUsers() {
        const response = await axios.get(getUsersRoute, {
            headers: {  
                Authorization: `Bearer ${process.env.KOMMO_API_KEY}`,
                Accept: 'application/json',
            },
        });
    return response.data;       
}