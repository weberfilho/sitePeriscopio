"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import PlaceCard from "@/components/cards/PlaceCard";
import api from "@/api/api";
import { PlaceGeneralData } from "@/interfaces/place";
import { useCityStorage } from "@/storage/city";
import dynamic from "next/dynamic";

interface Props {
  params: { idtype: number };
}

const PlaceList = ({ params }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState<PlaceGeneralData[]>([]);
  const { cityId } = useCityStorage();
  console.log("Id da cidade:", cityId);
  // useEffect(() => {
  //    api
  //     .get("place", {
  //       params: {
  //         category_id: params.idtype,
  //         city_id: 1,
  //       },
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setPlaces(response.data);
  //         setTimeout(() => {
  //           console.log(places);
  //         }, 2000)
  //       }

  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  // fetch(`https://x8ki-letl-twmt.n7.xano.io/api:EDKFhh3b/place?city_id=${cityId}&${params.idtype}`, {
  //   method: "get",
  //   //headers: {ac}
  // }).then(response => {});

  async function getPlaces() {
    console.log("CityId getPlace:", cityId);
    try {
      setIsLoading(true);
      const { data, status } = await api.get("place", {
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
      setIsLoading(false);
    }
  }

  console.log(places);
  console.log("Erro category_name: ", places[0]);

  useEffect(() => {
    getPlaces();
  }, [cityId]);

  return (
    <div className="flex-1">
      <h1 className="p-10 text-center font-serif text-2xl font-bold">
        {places[0]?.category_name}
      </h1>

      <ul>
        {places.map((place) => (
          <li key={place.id} className="mx-2">
            <Link href={`../../places/placeDetail/${place.id}`}>
              <PlaceCard
                name={place.name}
                neighborhood={place.neighborhood}
                city={place.city_name}
                uf={place.city_state}
                urlImage={place.url_image}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceList;
