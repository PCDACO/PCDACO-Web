import { z } from "zod";

export const GPSDeviceSchema = z.object({
  name: z.string(),
  status: z.number(),
  carId: z.string(),
});

export type GPSDevicePayloadSchema = z.infer<typeof GPSDeviceSchema>;
