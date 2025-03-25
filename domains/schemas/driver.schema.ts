import { z } from "zod";

export const DriverSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  address: z.string().min(1, "Address is required"),
  dateOfBirth: z.date(),
  phone: z.string().min(1, "Phone is required"),
  role: z.string().min(1, "Role is required"),
  createdAt: z.date(),
});

export const BanDriverSchema = z.object({
  reason: z.string().min(1, "Reason is required"),
});

export type DriverPayloadSchema = z.infer<typeof DriverSchema>;
export type BanDriverPayloadSchema = z.infer<typeof BanDriverSchema>;
