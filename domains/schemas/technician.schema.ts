import { z } from "zod";

export const TechnicianSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  address: z.string().min(1, "Address is required"),
  dateOfBirth: z.date(),
  phone: z.string().min(1, "Phone is required"),
  roleName: z.string().min(1, "RoleName is required"),
});

export type TechnicianSchemaPayload = z.infer<typeof TechnicianSchema>;
