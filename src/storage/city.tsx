import { create } from 'zustand'

interface CityState {
  cityId: number
  cityName: string
  setCity: (city: number) => void

}

export const useCity = create<CityState>((set) => ({
  cityId: 1,
  cityName: "Belo Horizonte",
  setCity: () => set((state) => ({ cityId: state.cityId })),
}))