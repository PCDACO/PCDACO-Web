import { z } from "zod";

export const AmenitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.instanceof(FileList, { message: "Icon must be a file" }),
});

export type AmenityPayloadSchema = z.infer<typeof AmenitySchema>;
