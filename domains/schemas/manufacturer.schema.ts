import { z } from "zod";

export const ManufacturerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z
    .any()
    .refine((file) => !file || file.length === 1, "Yêu cầu nhập ảnh"),
});

export type ManufacturerPayloadSchema = z.infer<typeof ManufacturerSchema>;
