import { z } from "zod";

export const PendingApprovalSchema = z.object({
  note: z.string().min(1, "")
});

export type PendingApprovalSchemaPayload = z.infer<typeof PendingApprovalSchema>;
