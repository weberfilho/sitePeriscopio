import React from "react";

type Evento = {
  name: String;
  local: String;
  startDate: Date | string;
  urlImage: string;
};

const EventCard = (props: Evento) => {
  return (
    <div className="my-2 flex flex-row rounded-xl border-2 border-solid border-black px-2 py-1 shadow-md shadow-gray-500">
      <div className="w-1/4">
        <img src={props.urlImage} className="h-32 w-32 p-2" alt="imagem" />
      </div>
      <div className="flex w-3/4 flex-col p-2">
        <h1 className="font-serif text-2xl font-bold italic">{props.name}</h1>
        <h3 className="mt-2 flex flex-row text-lg">{`Data: ${props.startDate}`}</h3>
        <h3 className="mt-2 flex flex-row text-lg">{`Local: ${props.local}`}</h3>
      </div>
    </div>
  );
};
export default EventCard;
