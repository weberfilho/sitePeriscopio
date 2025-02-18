import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CityState {
  cityId: number | null;
  cityName: string | null;
  setCity: (cityId: number | null, cityName: string) => void;
}

export const useCityStorage = create<CityState>()(
  persist(
    (set) => ({
      cityId: null,
      cityName: "",
      setCity: (cityId: number | null, cityName: string) => set({ cityId, cityName }),
    }),
    {
      name: "city-storage", // name of the item in the storage (must be unique)
    },
  ),
);
