"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import PlaceCard from "@/components/cards/PlaceCard";
import api from "@/api/api";
import { PlaceShortData } from "@/interfaces/place";
import { useCityStorage } from "@/storage/city";

interface Props {
  params: { idtype: number };
}

const PlaceList = ({ params }: Props) => {
  const [places, setPlaces] = useState<PlaceShortData[]>([]);
  const cityId = useCityStorage().cityId;

  console.log("Id da cidade:", cityId);

  async function getPlaces() {
    console.log("CityId getPlace:", cityId);
    try {
      const { data, status } = await api.get("locals", {
        params: {
          city_id: cityId,
          category_id: params.idtype,
        },
      });
      if (status === 200) {
        setPlaces(data);
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

      <ul>
        {places.map((place) => (
          <li key={place.id} className="mx-2">
            <Link href={`../../places/placeDetail/${place.id}`}>
              <PlaceCard
                name={place.name}
                neighborhood={place.adress.neighborhood}
                city={place.city.name}
                uf={place.city.state}
                urlImage={place?.image_place.path}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceList;
