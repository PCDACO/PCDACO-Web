import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDialogStore } from "@/stores/store";
import { DeleteDriver, GetDrivers } from "@/app/(dashboard)/(admin)/drivers/action";
import { DriverParams, DriverResponse } from "@/constants/models/driver.model";
import { BaseResponseWithPagination } from "@/constants/responses/base-response";
import { toastError, toastResponse } from "@/lib/toast-error";

interface DriverQuery {
  params?: DriverParams;
}

export const useDriverQuery = ({ params }: DriverQuery) => {
  if (params === undefined) {
    params = { index: 1, size: 10 };
  }

  const listDriverQuery = useQuery({
    queryKey: ["drivers", params],
    queryFn: () => GetDrivers(params),
    initialData: BaseResponseWithPagination<DriverResponse>,
    retry: 1
  });

  return { listDriverQuery };
};

export const useDriverMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();
  const deleteDriverMutation = useMutation({
    mutationKey: ["deleteDriver"],
    mutationFn: async (id: string) => await DeleteDriver(id),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["drivers"] });
      }
    },
    onError: (error:Error) => {
      toastError(error);
    },
  });

  return {
    deleteDriverMutation,
  };
};
