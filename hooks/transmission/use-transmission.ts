import {
  CreateManufacturer,
  DeleteManufacturer,
  UpdateManufacturer,
} from "@/app/(dashboard)/(admin)/manufacturers/action";
import { useDialogStore } from "@/stores/store";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import {
  TransmissionParams,
  TransmissionPayload,
} from "@/constants/models/transmission.model";
import {
  GetTransmissions,
  UpdateTransmission,
} from "@/app/(dashboard)/(admin)/transmissions/action";

interface TransmissionQuery {
  params?: TransmissionParams;
}

export const useTransmissionQuery = ({ params }: TransmissionQuery) => {
  if (params === undefined) {
    params = { index: 1, size: 10 };
  }

  const listTransmissionQuery = useQuery({
    queryKey: ["transmissions", params],
    queryFn: () => GetTransmissions(params),
  });

  return { listTransmissionQuery };
};

export const useTransmissionMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = new QueryClient();

  const createTransmission = useMutation({
    mutationKey: ["createTransmission"],
    mutationFn: async (payload: TransmissionPayload) => {
      await CreateManufacturer(payload);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.fetchQuery({ queryKey: ["transmissions"] });
    },
    onError: () => {
      toast({ title: "Không thể thêm nhà sản xuất" });
    },
  });

  const updateTransmission = useMutation({
    mutationKey: ["updateTransmission"],
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: TransmissionPayload;
    }) => {
      await UpdateTransmission(id, payload);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["transmissions"] });
    },
    onError: () => {
      toast({ title: "Không thể sửa nhà sản xuất này" });
    },
  });

  const deleteTransmission = useMutation({
    mutationKey: ["deleteManufacturer"],
    mutationFn: async (id: string) => {
      await DeleteManufacturer(id);
    },
    onSuccess: () => {
      setOpen(false);
      toast({ title: "Xóa thành công" });
      queryClient.invalidateQueries({ queryKey: ["transmissions"] });
    },
    onError: () => {
      toast({ title: "Không thể xóa nhà sản xuất này" });
    },
  });

  return {
    createTransmission,
    updateTransmission,
    deleteTransmission,
  };
};
