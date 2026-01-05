import dotenv from 'dotenv';

dotenv.config();
    
export default {
    apiToken: process.env.KOMMO_API_TOKEN,
    domain: process.env.KOMMO_DOMAIN,
}