import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDialogStore } from "@/stores/store";
import { CarParams, CarResponse } from "@/constants/models/car.model";
import { DeleteCar, GetCars } from "@/app/(dashboard)/(admin)/cars/action";
import { BaseResponseWithPagination } from "@/constants/responses/base-response";
import { toastError, toastResponse } from "@/lib/toast-error";

interface CarQuery {
  params?: Partial<CarParams>;
}

export const useCarQuery = ({ params }: CarQuery) => {
  if (params === undefined) {
    params = { index: 1, size: 10 };
  }

  const listCarQuery = useQuery({
    queryKey: ["cars", params],
    queryFn: () => GetCars(params),
    initialData: BaseResponseWithPagination<CarResponse>,
    enabled: !!params,
    staleTime: 0,
    retry: 1,
  });

  return { listCarQuery };
};

export const useCarMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();
  const deleteCarMutation = useMutation({
    mutationKey: ["deleteCar"],
    mutationFn: async (id: string) => await DeleteCar(id),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["cars"] });
      }
    },
    onError: (error: Error) => {
      toastError(error);
    },
  });

  return {
    deleteCarMutation,
  };
};
