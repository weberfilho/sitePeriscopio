"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";

import PlaceCard from "@/components/cards/PlaceCard";

import { useCityStorage } from "@/storage/city";
import { PlaceShortData } from "@/interfaces/place";

import api from "@/api/api";
import PopUp from "@/components/popup/Popup";
import PopUpMessage from "@/components/popUpMessage/page";
import createApiInstance from "@/api/api";

interface Props {
  params: { idtype: number };
}

const PlaceList = ({ params }: Props) => {
  const [places, setPlaces] = useState<PlaceShortData[]>([]);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const cityId = useCityStorage().cityId;
  const api = createApiInstance();

  async function getPlaces() {
    try {
      const { data, status } = await api.get("places", {
        params: {
          city_id: cityId,
          category_id: params.idtype,
        },
      });
      if (status === 200) {
        setPlaces(data);
        if (data.length === 0) {
          setIsPopUpVisible(true);
        }
      }
    } catch (error) {
      console.error("Erro getPlaces:", error);
    } finally {
    }
  }

  useEffect(() => {
    getPlaces();
  }, [cityId]);

  return (
    <div className="flex-1">
      <h1 className="p-4 text-center font-serif text-4xl font-bold italic">
        {places[0]?.category.name}
      </h1>
      {isPopUpVisible && (
        <PopUp isVisible={isPopUpVisible}>
          <PopUpMessage
            text="Não existem estabelecimentos cadastrados nesta categoria"
            action={() => setIsPopUpVisible(false)}
          />
        </PopUp>
      )}

      <ul>
        {places.map((place) => (
          <li key={place.id} className="mx-2">
            <Link href={`../../places/placeDetail/${place.id}`}>
              <PlaceCard
                name={place.name}
                neighborhood={place.adress.neighborhood}
                city={place.city.name}
                uf={place.city.state}
                urlImage={place?.image_place.url}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceList;
