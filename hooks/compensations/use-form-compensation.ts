import { CompensationPayload } from "@/constants/models/compensation.model";
import { CompensationPayloadSchema, CompensationSchema } from "@/domains/schemas/compensation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useCompensationMutation } from "./use-compensation";

interface Props {
  id: string;
  value: CompensationPayload
}
export const useCompensationForm = ({ id, value }: Props) => {
  const { createCompensation } = useCompensationMutation();
  const defaultValues = useMemo(() => {
    return {
      reportId: id ?? "",
      userId: value.userId ?? "",
      compensationReason: value.compensationReason ?? "",
      compensationAmount: value.compensationAmount ?? 0,
    }
  }, [id, value])

  const form = useForm<CompensationPayloadSchema>({
    resolver: zodResolver(CompensationSchema),
    defaultValues
  });

  const onSubmit = form.handleSubmit(() => {
    createCompensation.mutate({ id, payload: value });
  });
  return {
    form: form,
    onSubmit: onSubmit,
    isLoading: createCompensation.isLoading,
  }
}

