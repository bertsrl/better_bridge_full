import { Injectable } from '@nestjs/common';
import StripeApi from '@/store/stripe-api';
import KommoApi from '@/store/kommo-api';

@Injectable()
export class StripeService {
    constructor() { }
    
    async getBetePFAStripeIntent(rawPayload: any) {
        console.log('🔍 rawPayload: ', rawPayload);

        // get amount (in a separate variable) and customer id from payload
        const amount = rawPayload.data.object.amount;
        const customerId = rawPayload.data.object.customer;
        
        // get customer email from stripe
        const customerEmail = await StripeApi.getCustomerEmail(customerId);
        console.log('🔍 stripe webhook customerEmail: ', customerEmail);

        // search for existing CRM user in Kommo Pipeline (Registrations)
        const kommoSearchResponse = await KommoApi.searchLead({ email: customerEmail, pipeline: 'INSCRIERI' });
        console.log('🔍 stripe webhook kommoSearchResponse: ', kommoSearchResponse);

        // if found, insert the payment proof in Kommo
        if (kommoSearchResponse) {
            const kommoInsertResponse = await KommoApi.insertPaymentProof(
                // lead id
                kommoSearchResponse.id,
                { // payment proof
                    mode: "stripe", 
                    status: "success",
                    value: true,
                    amount: amount,
                    timestamp: new Date(rawPayload.data.object.created).toISOString(),
                    stripeLink: `https://dashboard.stripe.com/payments/${rawPayload.data.object.id}`,
                },
            );
            console.log('🔍 stripe webhook kommoInsertResponse: ', JSON.stringify(kommoInsertResponse, null, 2));
        }
        
        // if not found, send to BacklogService
        if (!kommoSearchResponse) {
            const kommoSendToBacklogResponse = await KommoApi.sendToBacklog({
                title: "UNASSIGNED PAYMENT",
                subtitle: `${customerEmail} a platit ${amount} prin Stripe Bete PFA`,
                tags: ["STRIPE"],
                additionalData: {
                    email: customerEmail,
                    url: `https://dashboard.stripe.com/payments/${rawPayload.data.object.id}`,
                },
            }); 
            console.log('🔍 stripe webhook kommoSendToBacklogResponse: ', JSON.stringify(kommoSendToBacklogResponse, null, 2));
        }
    }
}