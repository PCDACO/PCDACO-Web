import { z } from "zod";

export const InspectionScheduleSchema = z.object({
  technicianId: z.string().min(1, ""),
  carId: z.string().min(1, ""),
  inspectionAddress: z.string().min(1, ""),
  inspectionDate: z.date(),
  type: z.number(),
  reportId: z.string(),
});
export type InspectionSchedulePayloadSchema = z.infer<typeof InspectionScheduleSchema>
