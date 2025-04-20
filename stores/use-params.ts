import { CarParams } from "@/constants/models/car.model";
import { WithdrawRequestParams } from "@/constants/models/withdraw-request.model";
import { create } from "zustand";

type ParamsStore<T> = {
  params: T;
  setParams: (params: T) => void;
  resetParams: () => void;
};

export function createParamsStore<T>(initialParams: T) {
  return create<ParamsStore<T>>((set) => ({
    params: initialParams,
    setParams: (params) => set({ params }),
    resetParams: () => set({ params: initialParams }),
  }));
}

export const useCarParamsStore = createParamsStore<Partial<CarParams>>({});
export const useWithdrawRequestStore = createParamsStore<Partial<WithdrawRequestParams>>({});
