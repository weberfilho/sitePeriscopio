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
  const { cityId } = useCityStorage();

  function checkCity(cityId: number | null) {
    if (cityId === null) {
      setIsPopUpVisible(true);
    } else {
      setIsPopUpVisible(false);
    }
  }

  useEffect(() => {
    checkCity(cityId);
  }, [cityId]);

  return (
    <main className="flex flex-col px-16 pt-4">
      <div className="mb-6 mt-2 flex flex-col space-y-5">
        <Link
          href={{
            pathname: "./events/eventDate",
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
