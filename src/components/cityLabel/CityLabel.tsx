
"use client"
import { useCityStorage } from '@/storage/city';
import React from 'react'



const CityLabel = () => {
  const { cityName } = useCityStorage();

  return (
    <p className='text-lgf pb-2 font-semibold font-sans italic bold'>{cityName}</p>
    
  )
}

export default CityLabel