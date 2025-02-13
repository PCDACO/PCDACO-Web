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

interface GenericState<T> {
  data: T | null;
  setData: (payload: T) => void;
  clearData: () => void;
}

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
