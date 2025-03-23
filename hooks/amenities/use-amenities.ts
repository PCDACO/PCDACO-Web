import { useDialogStore } from "@/stores/store";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CreateAmenities,
  DeleteAmenity,
  GetAmenities,
  UpdateAmenity,
} from "@/app/(dashboard)/(admin)/amenities/action";
import {
  AmenityParams,
  AmenityPayLoad,
  AmenityResponse,
} from "@/constants/models/amenity.model";
import { BaseResponseWithPagination } from "@/constants/responses/base-response";
import { toastError, toastResponse } from "@/lib/toast-error";

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
    initialData: BaseResponseWithPagination<AmenityResponse>,
    retry: 1
  });

  return { listAmenityQuery };
};

export const useAmenityMutation = () => {
  const { setOpen } = useDialogStore();
  const queryClient = useQueryClient();

  const createAmentiy = useMutation({
    mutationKey: ["createAmenity"],
    mutationFn: async (payload: AmenityPayLoad) => await CreateAmenities(payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["amenities"] });
      }
    },
    onError: (error) => {
      toastError(error);
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
    }) => await UpdateAmenity(id, payload),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["amenities"] });
      }
    },
    onError: (error) => {
      toastError(error);
    },
  });

  const deleteAmenity = useMutation({
    mutationKey: ["deleteAmenity"],
    mutationFn: async (id: string) => await DeleteAmenity(id),
    onSuccess: (response) => {
      toastResponse(response);
      if (response.isSuccess) {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["amenities"] });
      }
    },
    onError: (error) => {
      toastError(error);
    },
  });

  return {
    createAmentiy,
    updateAmenity,
    deleteAmenity,
  };
};
