import { z } from "zod";

export const TransmissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type TransmissionPayloadSchema = z.infer<typeof TransmissionSchema>;
