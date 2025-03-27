import { GetInspectionSchedulesParams } from "@/constants/models/inspection-schedule.model";
import { TechnicianTaskRequest } from "@/constants/models/technician-task.model";
import { create } from "zustand";

interface DialogState {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

interface IDState {
  id: string;
  setId: (id: string) => void;
}

interface KeywordState {
  keyword: "create" | "update" | "delete";
  setKeyword: (keyword: "create" | "update" | "delete") => void;
}

interface KeyQuery {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

interface ParamsStore {
  value: RootRequest;
  setValue: (payload: RootRequest) => void;
}
interface InspectionScheduleParamsStore {
  value: GetInspectionSchedulesParams;
  setValue: (payload: GetInspectionSchedulesParams) => void;
}

interface GenericState<T> {
  data: T | null;
  setData: (payload: T) => void;
  clearData: () => void;
}

export const useParamStore = create<ParamsStore>((set) => ({
  value: {
    index: 1,
    size: 10,
    keyword: "",
  },
  setValue: (payload: RootRequest) => set({ value: payload }),
}));

export const useInspectionScheduleParamStore =
  create<InspectionScheduleParamsStore>((set) => ({
    value: {
      month: 3,
      year: 2025,
      technicianId: undefined,
    },
    setValue: (payload: GetInspectionSchedulesParams) =>
      set({ value: payload }),
  }));

export const useKeyQueryStore = create<KeyQuery>((set) => ({
  keyword: "",
  setKeyword: (keyword) => set({ keyword }),
}));

export const createGenericStore = <T>() =>
  create<GenericState<T>>((set) => ({
    data: null,
    setData: (payload) => set({ data: payload }),
    clearData: () => set({ data: null }),
  }));

export const useIdStore = create<IDState>((set) => ({
  id: "",
  setId: (id) => set({ id }),
}));

export const useKeywordStore = create<KeywordState>((set) => ({
  keyword: "create",
  setKeyword: (keyword) => set({ keyword }),
}));

export const useDialogStore = create<DialogState>((set) => ({
  open: false,
  setOpen: (isOpen) => set({ open: isOpen }),
}));

export const useTechnicianTaskStoreParams =
  createGenericStore<TechnicianTaskRequest>();
