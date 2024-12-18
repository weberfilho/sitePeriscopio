"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import PlaceCard from "@/components/cards/PlaceCard";
import api from "@/api/api";
import { PlaceData } from "@/interfaces/place";
import { useCityStorage } from "@/storage/city";
import router from "next/router";
import { usePlaceStorage } from "@/storage/place";

interface Props {
  params: { idtype: number };
}

const PlaceList = ({ params }: Props) => {
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const cityId = useCityStorage().cityId;
  const { setPlace } = usePlaceStorage();

  console.log("Id da cidade:", cityId); 

  async function getPlaces() {
    console.log("CityId getPlace:", cityId);
    try {
      const { data, status } = await api.get(
        "https://x8ki-letl-twmt.n7.xano.io/api:EDKFhh3b/locals",
        {
          params: {
            city_id: cityId,
            category_id: params.idtype,
          },
        },
      );
      if (status === 200) {
        setPlaces(data);
      }
    } catch (error) {
      console.error("Erro getPlaces:", error);
    } finally {
    }
  }

  console.log("Lista de places:", places);

  const handleClick = (place: PlaceData) => {
    // event.preventDefault();
    console.log("PlaceParam: ", place);
    setPlace(place);
    // router.push({
    // pathname: `../../places/placeDetail/${place.id}`,
    // });
  };

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
            <div onClick={() => handleClick(place)}>
              <Link href={`../../places/placeDetail/${place.id}`}>
                <PlaceCard
                  name={place.name}
                  neighborhood={place.adress.neighborhood}
                  city={place.city.name}
                  uf={place.city.state}
                  urlImage={place.image_place.path}
                />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceList;
