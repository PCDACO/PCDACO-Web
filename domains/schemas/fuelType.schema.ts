import { z } from "zod";

export const FuelTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type FuelTypePayloadSchema = z.infer<typeof FuelTypeSchema>;
