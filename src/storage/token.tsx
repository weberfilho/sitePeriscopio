import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TokenState {
  token: string | null;
  setToken: (token: string) => void;
}

export const useTokenStorage = create<TokenState>()(
  persist(
    (set) => ({
      token: null,

      setToken: (token: string) => set({ token }),
    }),
    {
      name: "token-storage", // name of the item in the storage (must be unique)
    },
  ),
);
