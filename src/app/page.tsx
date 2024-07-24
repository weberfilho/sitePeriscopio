'use client'

import Button from "@/components/button/Button";
import { Popup } from "@/components/popup/Popup";
import { useCityStorage } from "@/storage/city";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


export default function Home() {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false)
  const popUpRef = useRef<HTMLDivElement>(null)
  const cityId = useCityStorage((state) => state.cityId)

  function checkCity(cityId: number | null) {
    if (cityId === null) {
      setIsPopUpVisible(true)
    } else {
      setIsPopUpVisible(false)
    }
  }

  useEffect(() => {
    checkCity(cityId)
  }, [cityId])

  // console.log("Cidade:",city)
  return (
    <main className="flex flex-col px-16 pt-8  ">
      <input type="text" id="principal" className="px-4 py-4 border-spacing-4 rounded-full border-green border-solid border-2 shadow-md shadow-gray-500 border-black " placeholder="Pesquisar Festas e Locais">
      </input>
      <div className="flex flex-col space-y-5 my-8 ">
        <Link href={{
          pathname: "./events/eventDate",
          query: { userId: 1, city: cityId }
        }}>
          <Button title="FESTAS E EVENTOS" />
        </Link>

        <Link href={`./places/placeList/1`}>
          <Button title="BARES E BOTECOS" />
        </Link>
        <Link href={`./places/placeList/2`}>
          <Button title="CASAS NOTURNAS" />
        </Link>
        <Link href={`./places/placeList/3`}>
          <Button title="TEATROS" />
        </Link>
        <Link href={`./places/placeList/4`}>
          <Button title="CINEMAS" />
        </Link>
      </div>
      <Popup popUpRef={popUpRef} isVisible={isPopUpVisible}>{""}</Popup>

    </main>
  );
}
