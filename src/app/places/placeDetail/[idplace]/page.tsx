"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/button/Button";
import { PlaceData } from "@/interfaces/place";
import Link from "next/link";
import api from "@/api/api";
import { usePlaceStorage } from "@/storage/place";

interface Props {
  params: { idplace: number };
}

const placeDetail = ({ params }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { place } = usePlaceStorage();
  console.log("Place:", place);
  // const [placeData, setPlaceData] = useState<PlaceData>(
  //     {
  //       id: 2,
  //       name: '',
  //       niver_promo: 's',
  //       description: '',
  //       url_menu: '',
  //       url_juckebox: '',
  //       url_contact: '',
  //       priority: 0,
  //       url_schedule: '',
  //       street: '',
  //       adress_number: 0,
  //       city_name: '',
  //       city_state: '',
  //       neighborhood: '',
  //       fotos: []
  //       }
  //   )

  async function getPlaceDetail() {
    try {
      setIsLoading(true);
      const { data, status } = await api.get("placedetail", {
        params: {
          place_id: params.idplace,
        },
      });
      if (status === 200) {
        // setPlaceData(data);
      }
    } catch (error) {
      console.error("Erro getPlaces:", error);
    } finally {
      // console.log(placeData)
      setIsLoading(false);
    }
  }

  //   api
  //   .get("placedetail", {
  //     params: {
  //       place_id: params.idplace,
  //     },
  //   })
  //   .then((response) => {
  //     if (response.status === 200) {
  //       setPlaceData(response.data);
  //       console.log(params.idplace)
  //       console.log(placeData)
  //     }else{
  //       console.log("deu pau")
  //     }
  //   })
  //   .catch((error) => console.log(error));

  // }
  useEffect(() => {
    getPlaceDetail();
  }, [setIsLoading]);

  return (
    <div className="content-center px-8">
      <div className="flex flex-col">
        <h1 className="size-fit self-center font-serif text-4xl font-semibold italic">
          {place?.name}
        </h1>
        <img
          src="https://maisbaqueiro.files.wordpress.com/2015/06/35estrelas.jpg"
          className="w-32 self-center pt-2"
          alt="imagem"
        />
      </div>
      <div className="p-x-2 mt-4 flex flex-col rounded-xl border-2 border-solid pt-2 shadow-md shadow-fuchsia-800">
        <h1 className="text-md self-center font-serif font-bold italic">
          ANIVERSARIANTES
        </h1>
        <p className="text-md flex flex-row px-4">{place?.niver_promo}</p>
      </div>
      <p className="mt-1 py-4">{place?.description}</p>

      <p className="pb-4">
        Endereço:
        {` ${place?.street}, ${place?.adress_number} ${place?.neighborhood} -  ${place?.city_name} ${place?.city_state}`}
      </p>
      {/* <div className="grid grid-cols-2 gap-4">
        <Link href="../../../places/placeList/1">
          <Button title="AGENDA" />
        </Link>
        <Link href={placeData.url_contact}>
          <Button title="FOTOS" />
        </Link>
        <Link href={placeData.url_juckebox}>
          <Button title="JUCKEBOX" />
        </Link>
        <Link href={placeData.url_menu}>
          <Button title="CARDAPIO" />
        </Link>
        <Link href="/places/placeComents/1">
          <Button title="AVALIAÇÕES" />
        </Link>
        <Link href={placeData.url_contact}>
          <Button title="CONTATO" />
        </Link>
      </div> */}
    </div>
  );
};

export default placeDetail;
