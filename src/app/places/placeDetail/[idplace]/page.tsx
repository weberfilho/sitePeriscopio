"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/button/Button";
import { placeDetailData } from "@/interfaces/place";
import Link from "next/link";
import api from "@/api/api";

interface Props {
  params: { idplace: number };
}

// type Place = {
//   id: number,
//   city: string,
//   category: string,
//   name: string,
//   description: string,
//   urlMenu: string,
//   urlJuckebox: string,
//   urlFotos: string,
//   contato: string,
//   niverPromo: string
//   adress: {
//     id: number,
//     street: string,
//     num: number,
//     neighborhood: string,
//   }
// }

function placeDetail({ params }: Props) {

  const [placeData, setPlaceData] = useState<placeDetailData>({
  id: 0,
  name: '',
  niver_promo: 'sçkfsdfkçlsfd',
  description: '',
  url_menu: '',
  url_juckebox: '',
  url_contact: '',
  priority: 0,
  url_schedule: '',
  street: '',
  adress_number: 0,
  city_name: '',
  city_state: '',
  neighborhood: '',
  fotos: []
  });

  useEffect(() => {
    api
      .get("placedetail", {
        params: {
          place_id: params.idplace,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setPlaceData(response.data);
          console.log("buceta")
          console.log(placeData)
        }else{
          console.log("deu pau")
        }
      })
      .catch((error) => console.log(error));
  }, []);

  // const place: Place = {
  //   id: 3,
  //   city: "Belo Horizonte MG",
  //   category: "Bares e Botecos",
  //   name: "Bar do Orlando",
  //   description: "Bar do Orlando é o típico buteco mineiro, repleto de bons tira-gostos, cerveja gelada e uma boa prosa. Foi inaugurado originalmente como uma loja de artigos de pesca, já que na época da fundação ainda era possível tirar traíras e lambaris do Rio Arrudas, ali pertinho. Hoje, as prateleiras acomodam itens de mercearia, como sabão em pó e enlatados. O menu conta com porção de batatas assadas, torresmo de barriga e linguiça da roça com batata, além de espetinhos.",
  //   urlMenu: "https://mercearia130.pedidosite.com.br/delivery/montarModal?idProduto=290621",
  //   urlJuckebox: "https://open.spotify.com/playlist/37i9dQZF1DWTUHOvJwQIMp",
  //   urlFotos: "https://www.google.com.br",
  //   contato: "319847856575",
  //   niverPromo: "Aniversariantes com mais de 10 convidados ganham 15 chopps de 300 ml ou 2 drinks.",
  //   adress: {
  //     id: 2,
  //     street: "Rua Alvinópolis",
  //     num: 74,
  //     neighborhood: "Santa Tereza"
  //   }
  // }
  return (
    <div className="content-center px-8">
      <div className="flex flex-col">
        <h1 className="size-fit self-center font-serif text-4xl font-semibold italic">
          {placeData.name}
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
        <p className="text-md flex flex-row px-4">{placeData.niver_promo}</p>
      </div>
      <p className="mt-1 py-4">{placeData.description}</p>

      <p className="pb-4">
        Endereço:
        {` ${placeData.street}, ${placeData.adress_number} ${placeData.neighborhood} -  ${placeData.city_name} ${placeData.city_state}`}
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
}

export default placeDetail;
