import axios from 'axios';

const getCustomerEmailRoute = `https://api.stripe.com/v1/customers`;

const headers = {
    'Authorization': `Bearer ${process.env.STRIPE_BETEPFA_API_TOKEN}`,
    'Accept': 'application/json',
};

export default async function getCustomerEmail(customerId: string) {
    const response = await axios.get(`${getCustomerEmailRoute}/${customerId}`, { headers });
    return response.data.email;
}
