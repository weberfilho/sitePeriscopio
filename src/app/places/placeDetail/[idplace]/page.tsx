"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { Rating } from "react-simple-star-rating";

import Button from "@/components/button/Button";

import { PlaceData } from "@/interfaces/place";

import api from "@/api/api";
import createApiInstance from "@/api/api";

interface Props {
  params: { idplace: number };
}

const placeDetail = ({ params }: Props) => {
  const [place, setPlace] = useState<PlaceData>({} as PlaceData);
  const [average, setAverage] = useState(0);
  const api = createApiInstance();

  useEffect(() => {
    async function fetchDetails() {
      try {
        const { data, status } = await api.get("placedetail", {
          params: {
            place_id: params.idplace,
          },
        });
        if (status === 200) {
          setPlace(data.placeDetail);
          setAverage(data.average);
        }
      } catch (error) {
        console.error("placeDetail error:", error);
      } finally {
      }
    }
    fetchDetails();
  }, []);

  return (
    <div className="content-center px-8">
      <div className="flex flex-col">
        <h1 className="size-fit self-center font-serif text-3xl font-semibold italic">
          {place?.name}
        </h1>
        <div className="flex flex-row justify-center">
          {average && (
            <Rating
              size={24}
              initialValue={average}
              readonly
              SVGstyle={{ display: "inline" }}
            />
          )}
        </div>
      </div>
      {place?.niver_promo && (
        <div className="p-x-2 mt-4 flex flex-col rounded-xl border-2 border-solid pt-2 shadow-md shadow-fuchsia-800">
          <h1 className="text-md self-center font-serif font-bold italic">
            ANIVERSARIANTES
          </h1>
          <p className="text-md flex flex-row px-4">{place?.niver_promo}</p>
        </div>
      )}

      <p className="mt-1 py-4">{place?.description}</p>

      <p className="pb-4">
        Endereço:
        {` ${place?.adress?.street}, ${place?.adress?.number} ${place?.adress?.neighborhood} -  ${place?.city?.name} ${place?.city?.state}`}
      </p>
      {place.category_id === 1 || place.category_id === 2 ? (
        <div className="mb-8 grid grid-cols-2 gap-4">
          <Link href={`/places/scheduledevents/${place.adress_id}`}>
            <Button title="AGENDA" />
          </Link>
          <Link href={`/places/placepictures/${place.id}`}>
            <Button title="FOTOS" />
          </Link>
          <Link href={`place?.url_contact`}>
            <Button title="JUCKEBOX" />
          </Link>
          <Link href={`place?.url_contact`}>
            <Button title="CARDAPIO" />
          </Link>
          <Link href={`/places/placeComents/${place.id}`}>
            <Button title="AVALIACOES" />
          </Link>
          <Link href={`place?.url_contact`}>
            <Button title="CONTATO" />
          </Link>
        </div>
      ) : (
        <div className="mb-8 grid grid-cols-2 gap-4">
          <Link href={`../../places/scheduledevents/${place.adress_id}`}>
            <Button title="AGENDA" />
          </Link>
          <Link href={`place?.url_contact`}>
            <Button title="CONTATO" />
          </Link>
          <Link href={`/places/placeComents/${place.id}`}>
            <Button title="AVALIAÇÕES" />
          </Link>
          <Link href={`place?.url_contact`}>
            <Button title="UBER" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default placeDetail;
