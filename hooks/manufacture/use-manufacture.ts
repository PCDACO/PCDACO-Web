import {
  GetManufacturers,
  CreateManufacturer,
  DeleteManufacturer,
  UpdateManufacturer,
} from "@/app/(dashboard)/manufacturers/action";
import {
  ManufactureParams,
  ManufacturePayload,
} from "@/constants/models/manufacture.model";
import { useDialogStore } from "@/stores/store";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

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
    onError: () => {},
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
    onError: () => {},
  });

  const deleteManufacturerMutation = useMutation({
    mutationKey: ["deleteManufacturer"],
    mutationFn: async (id: string) => {
      await DeleteManufacturer(id);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
    },
    onError: () => {},
  });

  return {
    createManufacturerMutation,
    updateManufacturerMutation,
    deleteManufacturerMutation,
  };
};
