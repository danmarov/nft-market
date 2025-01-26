import { create } from "zustand";
import { GiftItem } from "./types";

interface StoreState {
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isInitialLoading: boolean;
  setIsInitialLoading: (isInitialLoading: boolean) => void;
  items: GiftItem[];
  setItems: (items: GiftItem[] | ((prev: GiftItem[]) => GiftItem[])) => void;
  isInitialLoaded: boolean;
  setIsInitialLoaded: (isInitialLoaded: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  page: 0,
  setPage: (page) =>
    set((state) => ({
      page: typeof page === "function" ? page(state.page) : page,
    })),
  hasMore: true,
  setHasMore: (hasMore) => set({ hasMore }),
  isInitialLoaded: false,
  setIsInitialLoaded: (isInitialLoaded) => set({ isInitialLoaded }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  isInitialLoading: true,
  setIsInitialLoading: (isInitialLoading) => set({ isInitialLoading }),
  items: [],
  setItems: (items) =>
    set((state) => ({
      items: typeof items === "function" ? items(state.items) : items,
    })),
}));
