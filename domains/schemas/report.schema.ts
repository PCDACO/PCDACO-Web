import { z } from "zod";

export const ApproveReportSchema = z.object({
  note: z.string().min(1, ""),
  images: z
    .any()
    .refine((file) => !file || file.length === 1, "Yêu cầu nhập ảnh"),
});

export type ApproveReportPayloadSchema = z.infer<typeof ApproveReportSchema>;
