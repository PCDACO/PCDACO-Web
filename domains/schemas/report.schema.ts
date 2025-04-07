import { z } from "zod";

export const ApproveReportSchema = z.object({
  note: z.string().min(1, ""),
});

export type ApproveReportPayloadSchema = z.infer<typeof ApproveReportSchema>;
