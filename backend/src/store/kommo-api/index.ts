import { insertLead } from './insert-lead';
import searchLead from './search-lead';
import { getPipelinesMap } from './pipelines/pipelinesMap';
import { sendToBacklog } from './send-to-backlog';
import { insertPaymentProof } from './insert-payment-proof';

export default {
    insertLead,
    searchLead,
    getPipelinesMap,
    sendToBacklog,
    insertPaymentProof,
}