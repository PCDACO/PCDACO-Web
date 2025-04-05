import { z } from "zod";

export const UpdateUserSchema = z.object({
  name: z.string().min(1, "Yêu cầu nhập"),
  email: z.string().min(1, "Yêu cầu nhập"),
  address: z.string().min(1, "Yêu cầu nhập"),
  dateOfBirth: z.date(),
  phone: z.string().min(1, "Yêu cầu nhập"),
});

export type UpdateUserPayloadSchema = z.infer<typeof UpdateUserSchema>;
