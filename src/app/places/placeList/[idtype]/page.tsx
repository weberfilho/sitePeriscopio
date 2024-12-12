"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import PlaceCard from "@/components/cards/PlaceCard";
import api from "@/api/api";
import { PlaceData } from "@/interfaces/place";
import { useCityStorage } from "@/storage/city";
import dynamic from "next/dynamic";
import CityIdStoraged from "@/components/cityIdStoraged/CityIdStoraged";
import router from "next/router";
import { usePlaceStorage } from "@/storage/place";
//import Globals from "@/components/global/Globals";
//const Globals = dynamic(() => import("@/components/input/Input"), { ssr: false });

interface Props {
  params: { idtype: number };
}

const PlaceList = ({ params }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const cityId = useCityStorage().cityId;

  const { setPlace } = usePlaceStorage();

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

  console.log("Lista de places:", places);
  console.log("Place indice zero: ", places[0]);

  const handleClick = (place: PlaceData, event: any) => {
    event.preventDefault();
    console.log("PlaceParam: ", place);
    setPlace(place);
    router.push({
      pathname: `../../places/placeDetail/${place.id}`,
    });
  };

  useEffect(() => {
    getPlaces();
  }, [cityId]);

  return (
    <div className="flex-1">
      <h1 className="p-4 text-center font-serif text-4xl font-bold italic">
        {places[0]?.category_name}
      </h1>

      <ul>
        {places.map((place) => (
          <li key={place.id} className="mx-2">
            <Link
              legacyBehavior
              // onClick={() => handleClick}
              href={`../../places/placeDetail/${place.id}`}
            >
              <a onClick={(e) => handleClick(place, e)}>
                <PlaceCard
                  name={place.name}
                  neighborhood={place.neighborhood}
                  city={place.city_name}
                  uf={place.city_state}
                  urlImage={place.url_image}
                />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceList;
