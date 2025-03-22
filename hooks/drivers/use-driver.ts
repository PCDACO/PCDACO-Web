import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDialogStore } from "@/stores/store";
import { toast } from "../use-toast";
import { DeleteDriver, GetDrivers } from "@/app/(dashboard)/(admin)/drivers/action";
import { DriverParams, DriverResponse } from "@/constants/models/driver.model";
import { BaseResponseWithPagination } from "@/constants/responses/base-response";

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
    mutationFn: async (id: string) => {
      await DeleteDriver(id);
    },
    onSuccess: () => {
      setOpen(false);
      toast({ title: "Xóa thành công" });
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
    onError: () => {
      toast({ title: "Không thể xóa người thuê xe này" });
    },
  });

  return {
    deleteDriverMutation,
  };
};
