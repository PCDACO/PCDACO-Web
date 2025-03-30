import { z } from "zod";

export const CompensationSchema = z.object({
  reportId: z.string(),
  userId: z.string(),
  compensationReason: z.string().min(1, "Reason is not valid"),
  compensationAmount: z.number().min(1, "Amount is not valid"),
});

export type CompensationPayloadSchema = z.infer<typeof CompensationSchema>;
