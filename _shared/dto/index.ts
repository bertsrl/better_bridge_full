import { z } from "zod";
import { apiInfoSchema, oauthTokensSchema, systemLogsSchema } from "../schemas/_index";

// DTO for the API info that will be stored in Firestore
export type ApiInfo = z.infer<typeof apiInfoSchema>;

// DTO for the system logs that will be stored in Firestore 
export type SystemLogs = z.infer<typeof systemLogsSchema>;

// DTO for the OAuth tokens that will be stored in Firestore
export type OAuthTokens = z.infer<typeof oauthTokensSchema>;