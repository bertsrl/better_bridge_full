import { z } from "zod";

export const oauthTokensSchema = z.object({
  id: z.string().min(1),
  apiId: z.string().min(1), // Which API these tokens belong to
  provider: z.enum(['kommo', 'hubspot', 'betterbot', 'spreadsheets']),
  accessToken: z.string().min(1), // ⚠️ ENCRYPTED
  refreshToken: z.string().min(1), // ⚠️ ENCRYPTED
  expiresAt: z.instanceof(Date),
  createdAt: z.instanceof(Date),
  lastRefreshed: z.instanceof(Date),
}).strict();