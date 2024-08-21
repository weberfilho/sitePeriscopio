import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CityState {
  cityId: number | null;
  cityName: string;
  setCity: (cityId: number, cityName: string) => void;
}

export const useCityStorage = create<CityState>()(
  persist(
    (set, get) => ({
      cityId: null,
      cityName: "",
      setCity: (cityId: number, cityName: string) => set({ cityId, cityName }),
    }),
    {
      name: "city-storage", // name of the item in the storage (must be unique)
    },
  ),
);
