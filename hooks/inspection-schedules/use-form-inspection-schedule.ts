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
  keyword: string;
}

export const useInspectionScheduleForm = ({
  id,
  value,
  keyword
}: InspectionScheduleFormProps) => {
  const { createInspectionSchedule, reassignInspectionSchedule, deleteInspectionSchedule } = useInspectionScheduleMutation();

  // Memoize defaultValues to prevent recalculating it on each render
  const defaultValues = useMemo(() => {
    return {
      technicianId: id ? value.technicianId : "",
      carId: id ? value.carId : "",
      inspectionAddress: id ? value.inspectionAddress : "",
      inspectionDate: id ? value.inspectionDate : new Date(),
      isIncident: id ? value.isIncident : false,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, value]);

  const form = useForm<InspectionSchedulePayloadSchema>({
    resolver: zodResolver(InspectionScheduleSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit((payload) => {
    console.log(payload);
    switch (keyword) {
      case "create": {
        return createInspectionSchedule.mutate(payload);
      };
      case "update": {
        return reassignInspectionSchedule.mutate({ id, payload });
      };
      case "delete": {
        return deleteInspectionSchedule.mutate(id);
      }
    }
  });

  return {
    form,
    onSubmit,
    isLoading: createInspectionSchedule.isLoading,
  };
};
