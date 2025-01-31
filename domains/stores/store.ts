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
  keyword: null,
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
    keyword: null,
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
