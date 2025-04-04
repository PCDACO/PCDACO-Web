import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Phải nhập email"),
  password: z.string().min(1, "Phải nhập password"),
});

export type LoginPayloadSchema = z.infer<typeof LoginSchema>
