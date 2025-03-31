import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReportMutation } from "./use-report";
import { ApproveReportPayloadSchema, ApproveReportSchema } from "@/domains/schemas/report.schema";
import { ApproveReportPayload } from "@/constants/models/report.model";

interface Props {
  id: string;
  value: ApproveReportPayload;
}

export const useReportForm = ({ id, value }: Props) => {
  const { approveReport } = useReportMutation();

  const defaultValues = useMemo(() => {
    return {
      note: value.note ?? "",
      images: value.images ?? new DataTransfer().files
    };
  }, [id, value]);

  const form = useForm<ApproveReportPayloadSchema>({
    resolver: zodResolver(ApproveReportSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit((payload) => {
    approveReport.mutate({ id, payload });
  });

  return {
    form,
    onSubmit,
    isLoading: approveReport.isLoading
  };
};
