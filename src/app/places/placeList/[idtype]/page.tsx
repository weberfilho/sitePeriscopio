"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import PlaceCard from "@/components/cards/PlaceCard";
import Globals from "@/components/global/Globals";
import { useCityStorage } from "@/storage/city";
import Place from "@/interfaces/place";
import api from "@/api/api";

// const places: Place[] =
// [
//   {
//     id: 1,
//     placeName: "Bar do Orlando",
//     city: "Belo Horizonte",
//     neighborhood: "Santa Tereza",
//     urlImage: "https://lh3.googleusercontent.com/p/AF1QipMh0LHeRpkkcFYY1LlvYDRBokPS827MevFSgPUj=s1360-w1360-h1020"
//   },
//   {
//     id: 2,
//     placeName: "Bar do Dudi",
//     city: "Belo Horizonte",
//     neighborhood: "Sion",
//     urlImage: "https://pbs.twimg.com/media/Fn0-xckWYAEUvOQ?format=jpg&name=large"
//   },
//   {
//     id: 3,
//     placeName: "Bola Bar",
//     city: "Belo Horizonte",
//     neighborhood: "Serra",
//     urlImage: "https://soubh.uai.com.br/uploads/thumbnail/image/1762/IMG_8898.jpg"
//   },
//   {
//     id: 4,
//     placeName: "Tizé Bar",
//     city: "Belo Horizonte",
//     neighborhood: "Lourdes",
//     urlImage: "https://fastly.4sqi.net/img/general/600x600/V3_aGkoBbVP3hLVGkzC7PJQ2pm6fX8IkqCUELcTItwk.jpg"

//   }
// ]

interface Props {
  params: { idtype: number };
}

const PlaceList = ({ params }: Props) => {
  const city_id = useCityStorage((state) => state.cityId)
  const [places, setPlaces] = useState<Place[]>([]);
  useEffect(() => {
    const getPlaces = async () => {
      try {
        const { data, status } = await api.get("place",{
          params: {
            city_id,
            category_id: params.idtype
          }
        });
        if (status === 200) {
          setPlaces(data);
        }
      } catch (error) {
        console.error("placeList erro:", error);
      }
    };
    getPlaces();

    // fetch(`https://x8ki-letl-twmt.n7.xano.io/api:EDKFhh3b/place?city_id=${cityId}&${params.idtype}`, {
    //   method: "get",
    //   //headers: {ac}
    // }).then(response => {});
  }, []);

  return (
    <div className="flex-1">
      <h1 className="p-10 text-center font-serif text-2xl font-bold">
        {"BARES E BOTECOS"}
      </h1>
      <ul>
        {places.map((place) => (
          <li key={place.id} className="mx-2">
            <Link href={`../../places/placeDetail/${place.id}`}>
              <PlaceCard
                name={place.placeName}
                neighborhood={place.neighborhood}
                city={place.city}
                urlImage={place.urlImage}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceList;
