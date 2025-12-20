export default function generatePaymentProof(
    mode: "stripe" | "bank",
    products?: any[],
) {
    //default status is pending
    return {
        mode: mode,
        status: "pending",
        value: true,
        amount: products?.[0]?.subTotal,
        timestamp: new Date(),
        stripeLink: products?.[0]?.stripeLink,
    };
}