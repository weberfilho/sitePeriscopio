import api from '@/api/api'
import City from '@/app/interfaces/city'
import React, { useEffect, useState } from 'react'


export const CitiesMenu = () => {
  const [cities, setCities] = useState<City[]>([])

  async function getCities() {
    try {
      const { data, status } = await api.get("city")
      console.log("response:", data)
      if (status === 200) {
        setCities(data)
      }

    } catch (error) {
      console.error("getCitiesError", error)
    }
  }
  useEffect(() => {
    getCities()
  })

  return (
    <div>{
      cities.map((city: City) => (
        <div><p>{city.cityName}</p></div>
      ))
    }
    </div>
  )
}

export default CitiesMenu
