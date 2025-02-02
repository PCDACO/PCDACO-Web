import { create } from "zustand";
import { LoginRequest } from "../models/auth/login.request";
import { GetCarsRequest } from "../models/cars/getcars.request";
import {
  GetCarsResponse,
  GetCarsResponses,
} from "../models/cars/getcars.response";
import {
  GetAmenitiesResponse,
  GetAmenitiesResponses,
} from "../models/amenities/getamenities.response";
import { GetAmenitiesRequest } from "../models/amenities/getamenities.request";
import { GetManufacturersRequest } from "../models/manufacturers/getmanufacturers.request";
import { GetManufacturersResponses } from "../models/manufacturers/getManufacturers.response";
import { CreateAmenitiesRequest } from "../models/amenities/createAmenities.request";
import { CreateAmenitiesResponse } from "../models/amenities/createAmenities.response";
import { CreateManufacturerRequest } from "../models/manufacturers/createManufacturer.request";
import { CreateManufacturerResponse } from "../models/manufacturers/createManufacturer.response";
import { UpdateAmenityRequest } from "../models/amenities/updateAmenities.request";
import { UpdateManufacturerRequest } from "../models/manufacturers/updateManufacturer.request";
import { DeleteAmenityRequest } from "../models/amenities/deleteAmenity.request";
import { GetFuelTypesRequest } from "../models/fuel-types/getFuelTypes.request";
import {
  GetFuelTypesResponse,
  GetFuelTypesResponses,
} from "../models/fuel-types/getFuelTypes.response";
import { CreateFuelTypeRequest } from "../models/fuel-types/createFuelType.request";
import { CreateFuelTypeResponse } from "../models/fuel-types/createFuelType.response";
import { UpdateFuelTypeRequest } from "../models/fuel-types/updateFuelType.request";
import { DeleteFuelTypeRequest } from "../models/fuel-types/deleteFuelType.request";
import { GetTransmissionsRequest } from "../models/transmissions/getTransmissions.request";
import {
  GetTransmissionResponse,
  GetTransmissionsResponses,
} from "../models/transmissions/getTransmissions.response";
import { DeleteTransmissionRequest } from "../models/transmissions/deleteTransmission.request";
import { UpdateTransmissionRequest } from "../models/transmissions/updateTransmission.request";
import { CreateTransmissionRequest } from "../models/transmissions/createTransmission.request";
import { CreateTransmissionResponse } from "../models/transmissions/createTransmission.response";
// Auth
export const useLoginRequest = create<LoginRequest>()((set) => ({
  email: "",
  password: "",
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
}));
// Cars
export const useGetCarsRequest = create<GetCarsRequest>()((set) => ({
  index: 1,
  size: 10,
  keyword: "",
  setIndex: (index: number) => set({ index }),
  setSize: (size: number) => set({ size }),
  setKeyword: (keyword: string) => set({ keyword }),
}));

export const useGetCarsResponses = create<GetCarsResponses>()((set) => ({
  items: [],
  hasNext: false,
  pageNumber: 1,
  pageSize: 10,
  totalItems: 0,
  setItems: (items: GetCarsResponse[]) => set({ items }),
  setHasNext: (hasNext: boolean) => set({ hasNext }),
  setPageNumber: (pageNumber: number) => set({ pageNumber }),
  setPageSize: (pageSize: number) => set({ pageSize }),
  setTotalItems: (totalItems: number) => set({ totalItems }),
}));
// Amenities
export const useGetAmenitiesRequest = create<GetAmenitiesRequest>()((set) => ({
  index: 1,
  size: 10,
  keyword: "",
  setIndex: (index: number) => set({ index }),
  setSize: (size: number) => set({ size }),
  setKeyword: (keyword: string) => set({ keyword }),
}));
export const useGetAmenitiesResponses = create<GetAmenitiesResponses>()(
  (set) => ({
    items: [],
    hasNext: false,
    pageNumber: 1,
    pageSize: 10,
    totalItems: 0,
    setItems: (items: GetAmenitiesResponse[]) => set({ items }),
    setHasNext: (hasNext: boolean) => set({ hasNext }),
    setPageNumber: (pageNumber: number) => set({ pageNumber }),
    setPageSize: (pageSize: number) => set({ pageSize }),
    setTotalItems: (totalItems: number) => set({ totalItems }),
  })
);

export const useCreateAmenitiesRequest = create<CreateAmenitiesRequest>()(
  (set) => ({
    name: "",
    description: "",
    setName: (name: string) => set({ name }),
    setDescription: (description: string) => set({ description }),
  })
);

export const useCreateAmenitiesResponse = create<CreateAmenitiesResponse>()(
  (set) => ({
    id: "",
    setId: (id: string) => set({ id }),
  })
);

export const useUpdateAmenityRequest = create<UpdateAmenityRequest>((set) => ({
  id: "",
  name: "",
  description: "",
  setName: (name: string) => set({ name }),
  setDescription: (description: string) => set({ description }),
  setId: (id: string) => set({ id }),
}));

export const useDeleteAmenityRequest = create<DeleteAmenityRequest>((set) => ({
  id: "",
  setId: (id: string) => set({ id }),
}));
// Manufacturers
export const useGetManufacturersRequest = create<GetManufacturersRequest>()(
  (set) => ({
    index: 1,
    size: 10,
    keyword: "",
    setIndex: (index: number) => set({ index }),
    setSize: (size: number) => set({ size }),
    setKeyword: (keyword: string) => set({ keyword }),
  })
);

export const useCreateManufacturerRequest = create<CreateManufacturerRequest>()(
  (set) => ({
    name: "",
    setName: (name: string) => set({ name }),
  })
);

export const useCreateManufacturerResponse =
  create<CreateManufacturerResponse>()((set) => ({
    id: "",
    setId: (id: string) => set({ id }),
  }));

export const useUpdateManufacturerRequest = create<UpdateManufacturerRequest>(
  (set) => ({
    id: "",
    name: "",
    setName: (name: string) => set({ name }),
    setId: (id: string) => set({ id }),
  })
);

export const useGetManufacturersResponses = create<GetManufacturersResponses>()(
  (set) => ({
    items: [],
    hasNext: false,
    pageNumber: 1,
    pageSize: 10,
    totalItems: 0,
    setItems: (items: GetAmenitiesResponse[]) => set({ items }),
    setHasNext: (hasNext: boolean) => set({ hasNext }),
    setPageNumber: (pageNumber: number) => set({ pageNumber }),
    setPageSize: (pageSize: number) => set({ pageSize }),
    setTotalItems: (totalItems: number) => set({ totalItems }),
  })
);

export const useDeleteManufacturerRequest = create<DeleteAmenityRequest>(
  (set) => ({
    id: "",
    setId: (id: string) => set({ id }),
  })
);
// Fuel Types
export const useGetFuelTypesRequest = create<GetFuelTypesRequest>((set) => ({
  index: 1,
  size: 10,
  keyword: "",
  setIndex: (index: number) => set({ index }),
  setSize: (size: number) => set({ size }),
  setKeyword: (keyword: string) => set({ keyword }),
}));

export const useGetFuelTypesResponses = create<GetFuelTypesResponses>()(
  (set) => ({
    items: [],
    hasNext: false,
    pageNumber: 1,
    pageSize: 10,
    totalItems: 0,
    setItems: (items: GetFuelTypesResponse[]) => set({ items }),
    setHasNext: (hasNext: boolean) => set({ hasNext }),
    setPageNumber: (pageNumber: number) => set({ pageNumber }),
    setPageSize: (pageSize: number) => set({ pageSize }),
    setTotalItems: (totalItems: number) => set({ totalItems }),
  })
);

export const useCreateFuelTypeRequest = create<CreateFuelTypeRequest>()(
  (set) => ({
    name: "",
    setName: (name: string) => set({ name }),
  })
);
export const useCreateFuelTypeResponse = create<CreateFuelTypeResponse>()(
  (set) => ({
    id: "",
    setId: (id: string) => set({ id }),
  })
);

export const useUpdateFuelTypeRequest = create<UpdateFuelTypeRequest>(
  (set) => ({
    id: "",
    name: "",
    setName: (name: string) => set({ name }),
    setId: (id: string) => set({ id }),
  })
);
export const useDeleteFuelTypeRequest = create<DeleteFuelTypeRequest>(
  (set) => ({
    id: "",
    setId: (id: string) => set({ id }),
  })
);
// Transmission
export const useGetTransmissionsRequest = create<GetTransmissionsRequest>()(
  (set) => ({
    index: 1,
    size: 10,
    keyword: "",
    setIndex: (index: number) => set({ index }),
    setSize: (size: number) => set({ size }),
    setKeyword: (keyword: string) => set({ keyword }),
  })
);

export const useGetTransmissionsResponses = create<GetTransmissionsResponses>(
  (set) => ({
    items: [],
    hasNext: false,
    pageNumber: 1,
    pageSize: 10,
    totalItems: 0,
    setItems: (items: GetTransmissionResponse[]) => set({ items }),
    setHasNext: (hasNext: boolean) => set({ hasNext }),
    setPageNumber: (pageNumber: number) => set({ pageNumber }),
    setPageSize: (pageSize: number) => set({ pageSize }),
    setTotalItems: (totalItems: number) => set({ totalItems }),
  })
);
export const useCreateTransmissionRequest = create<CreateTransmissionRequest>()(
  (set) => ({
    name: "",
    setName: (name: string) => set({ name }),
  })
);
export const useCreateTransmissionResponse = create<CreateTransmissionResponse>(
  (set) => ({
    id: "",
    setId: (id: string) => set({ id }),
  })
);
export const useDeleteTransmissionRequest = create<DeleteTransmissionRequest>(
  (set) => ({
    id: "",
    setId: (id: string) => set({ id }),
  })
);
export const useUpdateTransmissionRequest = create<UpdateTransmissionRequest>(
  (set) => ({
    id: "",
    name: "",
    setName: (name: string) => set({ name }),
    setId: (id: string) => set({ id }),
  })
);
