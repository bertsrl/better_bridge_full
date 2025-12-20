import { z } from "zod";
import { requestSchema } from "./custom-records/systemLogs/requestSchema";
import { responseSchema } from "./custom-records/systemLogs/responseSchema";
import { errorSchema } from "./custom-records/systemLogs/errorSchema";
import { integrationsSchema } from "./custom-records/systemLogs/integrationsSchema";

export const systemLogsSchema = z.object({
  id: z.string().min(1),
  apiId: z.string().min(1), // Reference to apiInfo
  timestamp: z.instanceof(Date), // Replace with z.custom<Timestamp>() if you use Firestore Timestamp, or adjust as needed
  request: requestSchema,
  response: responseSchema,
  success: z.boolean(),
  error: errorSchema,
  integrations: integrationsSchema,
}).strict();