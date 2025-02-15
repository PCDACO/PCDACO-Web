import { z } from "zod";

export const AmenitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.any(),
});

export type AmenityPayloadSchema = z.infer<typeof AmenitySchema>;
