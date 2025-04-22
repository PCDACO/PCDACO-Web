import { z } from "zod";

export const GPSDeviceSchema = z.object({
  name: z.string().min(1, ""),
  status: z.number(),
});

export type GPSDevicePayloadSchema = z.infer<typeof GPSDeviceSchema>;
