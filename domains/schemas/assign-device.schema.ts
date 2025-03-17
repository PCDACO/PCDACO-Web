import { z } from "zod";

export const AssignDeviceSchema = z.object({
  carId: z.string().min(1, "Car Id is required"),
  deviceId: z.string().min(1, "Device Id is required"),
  longtitude: z.number(),
  latitude: z.number(),
});

export type AssignDevicePayloadSchema = z.infer<typeof AssignDeviceSchema>;
