export interface StripeProof {
    mode: "stripe";
    status: "pending" | "success" | "reversed";
    value: boolean;
    amount: number;
    timestamp?: string;
    stripeLink?: string;
}

export interface BankProof {
    mode: "bank";
    status: "pending" | "success" | "reversed";
    value: boolean;
    amount: number;
    timestamp?: string;
    stripeLink?: string;
}

export type PaymentProof = StripeProof | BankProof | null;


/**
 * Example of products array
 * "products":[
 * {"productName":"Plat\u0103 integral\u0103",
 * "unitPrice":2180,"currency":"RON",
 * "quantity":1,"subTotal":2180,
 * "productOptions":["Amount: 2180 RON"]}]
 */