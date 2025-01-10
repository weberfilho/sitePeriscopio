"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { Rating } from "react-simple-star-rating";

import Button from "@/components/button/Button";

import { PlaceData } from "@/interfaces/place";

import api from "@/api/api";

interface Props {
  params: { idplace: number };
}

const placeDetail = ({ params }: Props) => {
  const [place, setPlace] = useState<PlaceData>({} as PlaceData);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
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
        setLoading(false);
      }
    }
    fetchDetails();
  }, []);

  if (loading === true) {
    return "aguardando...";
  }

  return (
    <>
      <div className="content-center px-8">
        <div className="flex flex-col">
          <h1 className="size-fit self-center font-serif text-4xl font-semibold italic">
            {place?.name}
          </h1>
          {/* <img
          src="https://maisbaqueiro.files.wordpress.com/2015/06/35estrelas.jpg"
          className="w-32 self-center pt-2"
          alt="imagem"
        /> */}
          {average && (
            <Rating
              initialValue={average}
              readonly
              SVGstyle={{ display: "inline" }}
            />
          )}
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
        <div className="grid grid-cols-2 gap-4">
          <Link href="../../../places/placeList/1">
            <Button title="AGENDA" />
          </Link>
          <Link href={`place?.url_contact`}>
            <Button title="FOTOS" />
          </Link>
          <Link href={`place?.url_contact`}>
            <Button title="JUCKEBOX" />
          </Link>
          <Link href={`place?.url_contact`}>
            <Button title="CARDAPIO" />
          </Link>
          <Link href="/places/placeComents/1">
            <Button title="AVALIAÇÕES" />
          </Link>
          <Link href={`place?.url_contact`}>
            <Button title="CONTATO" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default placeDetail;
