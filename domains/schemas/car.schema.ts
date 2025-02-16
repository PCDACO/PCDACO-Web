import { z } from "zod";

export const CarSchema = z.object({});

export type CarPayloadSchema = z.infer<typeof CarSchema>;
