import {
  GetManufacturers,
  CreateManufacturer,
  DeleteManufacturer,
  UpdateManufacturer,
} from "@/app/(dashboard)/(admin)/manufacturers/action";
import {
  ManufactureParams,
  ManufacturePayload,
} from "@/constants/models/manufacture.model";
import { useDialogStore } from "@/stores/store";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";

interface ManufactureQuery {
  params?: ManufactureParams;
}

export const useManuFactureQuery = ({ params }: ManufactureQuery) => {
  if (params === undefined) {
    params = { index: 1, size: 10 };
  }

  const listManuFactureQuery = useQuery({
    queryKey: ["manufacturers", params],
    queryFn: () => GetManufacturers(params),
  });

  return { listManuFactureQuery };
};

export const useManuFactureMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = new QueryClient();

  const createManufacturerMutation = useMutation({
    mutationKey: ["createManufacturer"],
    mutationFn: async (payload: ManufacturePayload) => {
      await CreateManufacturer(payload);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.fetchQuery({ queryKey: ["manufacturers"] });
    },
    onError: () => {
      toast({ title: "Không thể thêm nhà sản xuất" });
    },
  });

  const updateManufacturerMutation = useMutation({
    mutationKey: ["updateManufacturer"],
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: ManufacturePayload;
    }) => {
      await UpdateManufacturer(id, payload);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
    },
    onError: () => {
      toast({ title: "Không thể sửa nhà sản xuất này" });
    },
  });

  const deleteManufacturerMutation = useMutation({
    mutationKey: ["deleteManufacturer"],
    mutationFn: async (id: string) => {
      await DeleteManufacturer(id);
    },
    onSuccess: () => {
      setOpen(false);
      toast({ title: "Xóa thành công" });
      queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
    },
    onError: () => {
      toast({ title: "Không thể xóa nhà sản xuất này" });
    },
  });

  return {
    createManufacturerMutation,
    updateManufacturerMutation,
    deleteManufacturerMutation,
  };
};
