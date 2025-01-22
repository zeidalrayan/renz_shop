import { create } from "zustand";

export const useCounter = create((set) => ({
  count: 0,
  nama: "zeid",
  btnKurang: () =>
    set((state) => ({
      count: state.count - 1,
    })),

  btnTambah: () =>
    set((state) => ({
      count: state.count + 1,
    })),
}));
