export interface DemoPipeline {
    pipeline: "DEMO";
    status: "PENDING LEAD" | "PRE-FOLLOW UP" | "CONFIRMED" | "CANCELLED";
}

export interface SignupPipeline {
    pipeline: "SIGNUP";
    status: "REGISTERED" | "FOLLOW UP" | "URGENT" | "VALIDATED";
}

export interface BacklogPipeline {
    pipeline: "BACKLOG";
    status: "VALABILI" | "NEVER COME BACK";
}