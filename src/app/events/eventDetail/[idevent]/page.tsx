"use client";

import Button from "@/components/button/Button";
import { EventData } from "@/interfaces/event";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { format, fromUnixTime, getTime, parse, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import createApiInstance from "@/api/api";
import PopUp from "@/components/popup/Popup";
import PopUpMessage from "@/components/popUpMessage/page";

interface Props {
  params: { idevent: number };
}
type FormattedData = {
  startDate: string | Date;
  endDate: string | Date;
  startTime: string;
  endTime: string;
};

const eventDetail = ({ params }: Props) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [event, setEvent] = useState<EventData>({} as EventData);
  const [formattedData, setFormattedData] = useState<FormattedData>(
    {} as FormattedData,
  );

  const api = createApiInstance();

  const DadosFormatados = (value: EventData) => {
    const modifiedDate: FormattedData = {
      startDate: format(parseISO(value.start_date as string), "dd/MM - EEEE", {
        locale: ptBR,
      }),
      endDate: format(parseISO(value.start_date as string), "dd/MM - EEEE", {
        locale: ptBR,
      }),
      startTime: format(fromUnixTime(value.start_time), "HH:mm"),

      endTime: format(fromUnixTime(value.finish_time), "HH:mm"),
    };

    setFormattedData(modifiedDate);
  };

  useEffect(() => {
    async function fetchEventDetails() {
      try {
        const { data, status } = await api.get("event", {
          params: {
            event_id: params.idevent,
          },
        });
        if (status === 200) {
          setEvent(data);
          DadosFormatados(data);
        }
      } catch (error) {
        console.error("eventDetail error:", error);
      }
    }

    fetchEventDetails();
  }, []);

  return (
    <div className="content-center px-8">
      <div className="flex flex-col">
        <h1 className="size-fit self-center pb-4 font-serif text-3xl font-semibold italic">
          {event?.name}
        </h1>
        <img
          src={event?.event_image?.url}
          className="max-h-40 w-full self-center pt-2"
          alt="imagem"
        />
      </div>
      <p className="py-2">{event?.description}</p>
      <p className="pt-4">
        <strong className="font-bold italic">Início:</strong>
        {` ${formattedData.startDate} as ${formattedData.startTime} Horas`}
      </p>
      <p>
        <strong className="font-bold italic">Fim:</strong>
        {` ${formattedData.endDate} as ${formattedData.endTime} Horas`}
      </p>
      <p className="pt-4">
        <strong className="font-bold italic">Local:</strong>
        {` ${event?.local_name}`}
      </p>
      <p className="pb-4">
        <strong className="font-bold italic">Endereço:</strong>
        {` ${event?.adress?.street}, ${event?.adress?.number} ${event?.adress?.neighborhood} -  ${event?.city?.name} ${event?.city?.state}`}
      </p>
      <div className="mb-8 grid grid-cols-2 gap-4">
        <div
          onClick={() => {
            event.url_ticket
              ? window.open(`https://${event.url_ticket}`, "_blank")
              : setIsPopUpVisible(true);
          }}
        >
          <Button title="INGRESSOS" />
        </div>
        <Link href={`../../../events/eventChat/${event.id}`}>
          <Button title="CHAT" />
        </Link>
        <div
          onClick={() => {
            event.contact_number
              ? window.open(`https://wa.me/${event.contact_number}`, "_blank")
              : setIsPopUpVisible(true);
          }}
        >
          <Button title="CONTATO" />
        </div>

        <div onClick={() => setIsPopUpVisible(true)}>
          <Button title="UBER" />
        </div>

        {isPopUpVisible && (
          <PopUp isVisible={isPopUpVisible}>
            <PopUpMessage
              text="Serviço indisponível para este evento"
              action={() => setIsPopUpVisible(false)}
            />
          </PopUp>
        )}
      </div>
    </div>
  );
};

export default eventDetail;
