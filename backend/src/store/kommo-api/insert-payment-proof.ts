import axios from 'axios';
import { PaymentProof } from '@/utils/types/payments.types';
import { getFieldsMap } from './fields/fieldsMap';

const updateLeadRoute = `https://betterspeakers.kommo.com/api/v4/leads`;
const addNoteToLeadRoute = `https://betterspeakers.kommo.com/api/v4/leads/notes`;

async function insertPaymentProofFieldValue(
    leadId: string,
    paymentProof: PaymentProof
) {
    /**
     * curl --request PATCH \
     --url https://betterspeakers.kommo.com/api/v4/leads \
     --header 'accept: application/json' \
     --header 'authorization: Bearer ${process.env.KOMMO_API_KEY}' \
     --header 'content-type: application/json' \
     --data '[{"id": leadId, "custom_fields_values": [{"field_id": 1234567890, "values": [{"value": "payment proof"}]}]}]'
     */
    const fieldsMap = await getFieldsMap();
    const response = await axios.patch(updateLeadRoute, [{
        id: leadId,
        custom_fields_values: [
            {
                field_id: fieldsMap['PAYMENT PROOF'],
                values: [
                    {
                        value: `DATE: ${paymentProof.timestamp}, AMOUNT: ${paymentProof.amount}, STRIPE LINK: ${paymentProof.stripeLink}`,
                    },
                ],
            },
        ],
    }], {
        headers: {
            Authorization: `Bearer ${process.env.KOMMO_API_KEY}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    if (response.status !== 201 && response.status !== 200) {
        console.error('Error inserting payment proof:', response.data);
        return null;
    }

    return response.data;
}

async function insertPaymentProofNote(
    leadId: string,
    paymentProof: PaymentProof
) {
    /**
     * curl --request POST \
     --url https://betterspeakers.kommo.com/api/v4/leads/notes \
     --header 'accept: application/json' \
     --header 'authorization: Bearer ${process.env.KOMMO_API_KEY}' \
     --header 'content-type: application/json' \
     --data '[
        {
            "entity_id": 15303890,
            "note_type": "common",
            "params": {
            "text": "Test Note"
            }
        }
    ]'
     */
    const response = await axios.post(addNoteToLeadRoute, [{
        entity_id: leadId,
        note_type: "common",
        params: {
            text: `
                MODE: ${paymentProof.mode == "stripe" ? "Stripe" : "Bank"} \n
                STATUS: ${paymentProof.status == "success" ? "Success" : "Pending"} \n
                VALUE: ${paymentProof.value} \n
                AMOUNT: ${paymentProof.amount} \n
                TIMESTAMP: ${paymentProof.timestamp} \n
                STRIPE LINK: ${paymentProof.stripeLink} \n
            `,
        },
    }], {
        headers: {
            Authorization: `Bearer ${process.env.KOMMO_API_KEY}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    if (response.status !== 201 && response.status !== 200) {
        console.error('Error inserting payment proof:', response.data);
        return null;
    }

    return response.data;
}

export async function insertPaymentProof(
    leadId: string,
    paymentProof: PaymentProof
) {
    const fieldResponse = await insertPaymentProofFieldValue(leadId, paymentProof);
    const noteResponse = await insertPaymentProofNote(leadId, paymentProof);
    
    return {
        fieldResponse,
        noteResponse,
    };
}