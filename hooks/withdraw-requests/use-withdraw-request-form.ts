import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AmenityPayloadSchema,
  AmenitySchema,
} from "@/domains/schemas/amenity.schema";
import { WithdrawRequestPayload } from "@/constants/models/withdraw-request.model";
import { WithdrawRequestPayloadSchema, WithdrawRequestSchema } from "@/domains/schemas/withdraw-request.schema";
import { useWithdrawRequestMutation } from "./use-withdraw-request";

interface Props {
  id: string;
  value?: WithdrawRequestPayload;
}

export const useWithdrawRequestForm = ({ id, value }: Props) => {
  const { confirmWithdrawRequest } = useWithdrawRequestMutation();
  // Memoize defaultValues to prevent recalculating it on each render
  const defaultValues = useMemo(() => {
    return {
      adminNote: id ? value?.adminNote : "",
      transactionProof: id ? value?.transactionProof : new DataTransfer().files,
    };
  }, [id, value]);

  const form = useForm<WithdrawRequestPayloadSchema>({
    resolver: zodResolver(WithdrawRequestSchema),
    defaultValues,
  });
  const onSubmit = form.handleSubmit(async (payload) => {
    confirmWithdrawRequest.mutate({
      id,
      payload
    })
  });

  return {
    form,
    onSubmit,
    isLoading: confirmWithdrawRequest.isLoading,
  };
};
