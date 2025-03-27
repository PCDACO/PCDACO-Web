import { z } from "zod";

export const WithdrawRequestSchema = z.object({
  transactionProof: z
    .any()
    .refine((file) => !file || file.length === 1, "Yêu cầu nhập ảnh"),
  adminNote: z.string(),
});

export type WithdrawRequestPayloadSchema = z.infer<typeof WithdrawRequestSchema>;
