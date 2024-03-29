import { create } from "zustand";
type LoadingStore = {
    isLoading: boolean;
    toggleIsLoading: () => void;
};

export const useLoadingStore = create<LoadingStore>((set, get) => ({
    isLoading: false,
    toggleIsLoading: () => {
        set((state) => ({ isLoading: !state.isLoading }));
        console.log(get().isLoading);
    },
}));
