import { z } from "zod";

export const OwnerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  address: z.string().min(1, "Address is required"),
  dateOfBirth: z.date(),
  phone: z.string().min(1, "Phone is required"),
  role: z.string().min(1, "Role is required"),
  createdAt: z.date(),
});

export type OwnerPayloadSchema = z.infer<typeof OwnerSchema>;
