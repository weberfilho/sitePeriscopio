import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userId: number | null;
  userName: string | null;
  setUserData: (userId: number, userName: string) => void;
}

export const useUserStorage = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      userName: null,
      setUserData: (userId: number, userName: string) =>
        set({ userId, userName }),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
    },
  ),
);
