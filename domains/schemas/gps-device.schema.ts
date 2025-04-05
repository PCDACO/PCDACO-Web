import { z } from "zod";

export const GPSDeviceSchema = z.object({
  name: z.string(),
});

export type GPSDevicePayloadSchema = z.infer<typeof GPSDeviceSchema>;
