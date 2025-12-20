import { z } from "zod";

export const fieldsMappingSchema = z.record(z.string(), z.string())