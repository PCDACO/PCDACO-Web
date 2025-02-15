import { useDialogStore } from "@/stores/store";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import {
  FuelTypeParams,
  FuelTypePayload,
} from "@/constants/models/fuelType.model";
import {
  CreateFuelType,
  DeleteFuelType,
  GetFuelTypes,
  UpdateFuelType,
} from "@/app/(dashboard)/fuel-types/action";

interface FuelTypeQuery {
  params?: FuelTypeParams;
}

export const useFuelTypeQuery = ({ params }: FuelTypeQuery) => {
  if (params === undefined) {
    params = { index: 1, size: 10 };
  }

  const listFuelTypeQuery = useQuery({
    queryKey: ["fueltypes", params],
    queryFn: () => GetFuelTypes(params),
  });

  return { listFuelTypeQuery };
};

export const useFuelTypeMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = new QueryClient();

  const createFuelType = useMutation({
    mutationKey: ["createFuelType"],
    mutationFn: async (payload: FuelTypePayload) => {
      await CreateFuelType(payload);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.fetchQuery({ queryKey: ["fueltypes"] });
    },
    onError: () => {
      toast({ title: "Không thể thêm loại nhiên liệu" });
    },
  });

  const updateFuelType = useMutation({
    mutationKey: ["updateFuelType"],
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: FuelTypePayload;
    }) => {
      await UpdateFuelType(id, payload);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["fueltypes"] });
    },
    onError: () => {
      toast({ title: "Không thể  sửa loại nhiên liệu" });
    },
  });

  const deleteFuelType = useMutation({
    mutationKey: ["deleteFuelType"],
    mutationFn: async (id: string) => {
      await DeleteFuelType(id);
    },
    onSuccess: () => {
      setOpen(false);
      toast({ title: "Xóa thành công" });
      queryClient.invalidateQueries({ queryKey: ["fueltypes"] });
    },
    onError: () => {
      toast({ title: "Không thể xóa loại nhiên liệu" });
    },
  });

  return {
    createFuelType,
    updateFuelType,
    deleteFuelType,
  };
};
