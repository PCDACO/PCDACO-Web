import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useDialogStore } from "@/stores/store";
import { toast } from "../use-toast";
import { CarParams } from "@/constants/models/car.model";
import { DeleteCar, GetCars } from "@/app/(dashboard)/cars/action";

interface CarQuery {
  params?: CarParams;
}

export const useCarQuery = ({ params }: CarQuery) => {
  if (params === undefined) {
    params = { index: 1, size: 10 };
  }

  const listCarQuery = useQuery({
    queryKey: ["cars", params],
    queryFn: () => GetCars(params),
  });

  return { listCarQuery };
};

export const useCarMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = new QueryClient();
  const deleteCarMutation = useMutation({
    mutationKey: ["deleteCar"],
    mutationFn: async (id: string) => {
      await DeleteCar(id);
    },
    onSuccess: () => {
      setOpen(false);
      toast({ title: "Xóa thành công" });
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: () => {
      toast({ title: "Không thể xóa xe này" });
    },
  });

  return {
    deleteCarMutation,
  };
};
