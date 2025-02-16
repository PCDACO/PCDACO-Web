import { z } from "zod";

export const ModelSchema = z.object({
  name: z.string().min(1, "Name is required"),
  releaseDate: z.date(),
  manufacturerId: z.string().min(1, "Manufacturer is required"),
});

export type ModelPayloadSchema = z.infer<typeof ModelSchema>;
