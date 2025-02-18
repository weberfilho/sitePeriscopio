import Button from "@/components/button/Button";
import Link from "next/link";
import React from "react";

const sugestionSearch = () => {
  return (
    <div className="mb-8 content-center px-8">
      <h1 className="p-4 text-center font-serif text-4xl font-bold">
        Contamos com você!
      </h1>
      <h3 className="py-4 text-lg">
        A comunidade Periscópio está cada dia maior. E para que a gente possa
        continuar oferecendo as melhores dicas de diversão da cidade precisamos
        da sua ajuda. Caso você conheça algum evento ou estabelecimento de
        destaque, pedimos a gentileza de sugerí-lo através dos botões abaixo.
      </h3>
      <div className="grid-col-2 mt-4 grid gap-8">
        <Link href={`/sugestions/eventsuggestion`}>
          <Button title="SUGERIR EVENTO" />
        </Link>
        <Link href={`/sugestions/placesuggestion`}>
          <Button title="SUGERIR LOCAL" />
        </Link>
      </div>
    </div>
  );
};
export default sugestionSearch;
