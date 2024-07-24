import { create } from 'zustand'
import { persist } from 'zustand/middleware'


interface CityState {
  cityId: number | null
  cityName: string
  setCity: (city: number) => void
}

// export const useCity = create<CityState>(
//   (set) => ({
//     cityId: 1,
//     cityName: "Belo Horizonte",

//     ,
//   }))

// export const useCity = create<CityState>(
//   persist(
//     (set, get) => ({
//       cityId: 1,
//       cityName: "Belo Horizonte",
//       // setCity: () => set(( => ({ cityId: state.cityId })),
//       setCity: () => set({ cityId: get().cityId })

//     }),
//     {
//       // name: 'food-storage', // name of the item in the storage (must be unique)

//     },
//   ),
// )

export const useCityStorage = create<CityState>()(
  persist(
    (set, get) => ({
      cityId: null,
      cityName: "",
      setCity: () => set({ cityId: get().cityId }),
    }),
    {
      name: 'city-storage', // name of the item in the storage (must be unique)
    },
  ),
)