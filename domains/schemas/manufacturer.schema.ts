import { z } from "zod";

export const ManufacturerSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type ManufacturerPayloadSchema = z.infer<typeof ManufacturerSchema>;
