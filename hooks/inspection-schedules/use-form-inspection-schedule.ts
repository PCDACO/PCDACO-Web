import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInspectionScheduleMutation } from "./use-inspection-schedules";
import { InspectionSchedulePayload } from "@/constants/models/inspection-schedule.model";
import {
  InspectionSchedulePayloadSchema,
  InspectionScheduleSchema,
} from "@/domains/schemas/inspection-schedule.schema";

interface InspectionScheduleFormProps {
  id: string;
  value: InspectionSchedulePayload;
}

export const useInspectionScheduleForm = ({
  id,
  value,
}: InspectionScheduleFormProps) => {
  const { createInspectionSchedule } = useInspectionScheduleMutation();

  // Memoize defaultValues to prevent recalculating it on each render
  const defaultValues = useMemo(() => {
    return {
      technicianId: "",
      carId: "",
      inspectionAddress: "",
      inspectionDate: new Date(),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, value]);

  const form = useForm<InspectionSchedulePayloadSchema>({
    resolver: zodResolver(InspectionScheduleSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (payload) => {
    createInspectionSchedule.mutate(payload);
  });

  return {
    form,
    onSubmit,
    isLoading: createInspectionSchedule.isPending,
  };
};
