import { useDialogStore } from "@/stores/store";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "../use-toast";
import {
  CreateAmenities,
  DeleteAmenity,
  GetAmenities,
  UpdateAmenity,
} from "@/app/(dashboard)/(admin)/amenities/action";
import {
  AmenityParams,
  AmenityPayLoad,
} from "@/constants/models/amenity.model";

interface AmenityQuery {
  params?: AmenityParams;
}

export const useAmenityQuery = ({ params }: AmenityQuery) => {
  if (params === undefined) {
    params = { index: 1, size: 10 };
  }

  const listAmenityQuery = useQuery({
    queryKey: ["amenities", params],
    queryFn: () => GetAmenities(params),
  });

  return { listAmenityQuery };
};

export const useAmenityMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();

  const createAmentiy = useMutation({
    mutationKey: ["createAmenity"],
    mutationFn: async (payload: AmenityPayLoad) => {
      await CreateAmenities(payload);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },
    onError: () => {
      toast({ title: "Không thể thêm nhà sản xuất" });
    },
  });

  const updateAmenity = useMutation({
    mutationKey: ["updateAmenity"],
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: AmenityPayLoad;
    }) => {
      await UpdateAmenity(id, payload);
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },
    onError: () => {
      toast({ title: "Không thể sửa nhà sản xuất này" });
    },
  });

  const deleteAmenity = useMutation({
    mutationKey: ["deleteAmenity"],
    mutationFn: async (id: string) => {
      console.log("🔍 ~ hooks/amenities/use-amenities.ts:72 ~ id:", id);
      await DeleteAmenity(id);
    },
    onSuccess: () => {
      setOpen(false);
      toast({ title: "Xóa thành công" });
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },
    onError: () => {
      toast({ title: "Không thể xóa nhà sản xuất này" });
    },
  });

  return {
    createAmentiy,
    updateAmenity,
    deleteAmenity,
  };
};
