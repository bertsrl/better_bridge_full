import getUsers from '../get-users';

export async function getUsersMap() {
    const usersResponse = await getUsers();

    const users = usersResponse._embedded.users;
    return {
        'Better Speakers': users.find(user => user.name === 'Better Speakers')?.id,
    };
}