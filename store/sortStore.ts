import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SortState {
  isSort: boolean;
  onToggleSort: (sort: boolean) => void;
}

const useSortStore = create<SortState>()((set) => ({
  isSort: false,
  onToggleSort(sort: boolean) {
    set({ isSort: sort });
  },
}));

export default useSortStore;
