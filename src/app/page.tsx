"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import dynamic from "next/dynamic";

import Button from "@/components/button/Button";
import CitiesMenu from "@/components/citiesMenu/citiesMenu";
const PopUp = dynamic(() => import("@/components/popup/Popup"), { ssr: false });

import { useCityStorage } from "@/storage/city";

export default function Home() {
  const [isPopUpVisible, setIsPopUpVisible] = useState(true);
  const cityId = useCityStorage((state) => state.cityId);

  console.warn("cityId", cityId);

  useEffect(() => {
    function checkCity(cityId: number | null) {
      if (cityId === null) {
        setIsPopUpVisible(true);
      } else {
        setIsPopUpVisible(false);
      }
    }

    checkCity(cityId);
  }),
    [cityId];

  return (
    <main className="flex flex-col px-16 pt-8">
      <input
        type="text"
        id="principal"
        className="border-green border-spacing-4 rounded-full border-2 border-solid border-black px-4 py-4 shadow-md shadow-gray-500"
        placeholder="Pesquisar Festas e Locais"
      />
      <div className="my-8 flex flex-col space-y-5">
        <Link
          href={{
            pathname: "./events/eventDate",
            query: { userId: 1, city: cityId },
          }}
        >
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

      {cityId === null && isPopUpVisible && (
        <PopUp isVisible={true}>
          <CitiesMenu />
        </PopUp>
      )}
    </main>
  );
}
