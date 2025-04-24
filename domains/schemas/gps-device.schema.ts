import { z } from "zod";

export const GPSDeviceSchema = z.object({
  name: z.string(),
  status: z.number(),
});

export type GPSDevicePayloadSchema = z.infer<typeof GPSDeviceSchema>;
