"use client";
import api from "@/api/api";
import Button from "@/components/button/Button";
import { EventData } from "@/interfaces/event";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { format, fromUnixTime, getTime, parse, parseISO } from "date-fns";
import { Locale, ptBR } from "date-fns/locale";

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
  const [event, setEvent] = useState<EventData>({} as EventData);
  const [formattedData, setFormattedData] = useState<FormattedData>(
    {} as FormattedData,
  );

  const DadosFormatados = (value: EventData) => {
    console.log("Procurado", value);
    const aux = fromUnixTime(value.start_time);
    console.log("ERRO", aux);

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

    // }),

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

          console.log("Dados do Event: ", data);
          console.log("Dados do Event3: ", formattedData);
        }
      } catch (error) {
        console.error("eventDetail error:", error);
      }
    }

    fetchEventDetails();
  }, []);

  // useEffect(() => {
  //   DadosFormatados(event)
  // }, [event]);
  // const [event, setEvent] = useState<EventData>({} as EventData);
  // const [formattedData, setFormattedData] = useState<FormattedData>(
  //   {} as FormattedData,
  // );

  // const DadosFormatados = (value: EventData) => {
  //   const modifiedDate: FormattedData = {
  //     startDate: format(value.start_date, "dd/MM - EEEE"),
  //     startTime: format(value.start_time, "HH:mm"),
  //     endDate: format(value.start_date, "dd/MM - EEEE", {
  //       locale: require("date-fns/locale/pt-BR"),
  //     }),
  //     endTime: format(value.start_date, "HH:mm"),
  //   };
  //   setFormattedData(modifiedDate);
  // };
  // useEffect(() => {
  //   async function fetchEventDetails() {
  //     try {
  //       const { data, status } = await api.get("event", {
  //         params: {
  //           event_id: params.idevent,
  //         },
  //       });
  //       if (status === 200) {
  //         setEvent(data);
  //         //DadosFormatados(data);

  //         console.log("Dados do Event: ", data);
  //         console.log("Dados do Event2: ", event);
  //         console.log("Dados do Event3: ", formattedData);
  //       }
  //     } catch (error) {
  //       console.error("eventDetail error:", error);
  //     } finally {
  //     }
  //   }

  //   fetchEventDetails();
  // }, []);
  // useEffect(() => {
  //   DadosFormatados(event);
  // }, [event]);

  return (
    <div className="content-center px-8">
      <div className="flex flex-col">
        <h1 className="flex p-2 text-center align-middle font-serif text-4xl font-semibold italic">
          {event?.name}
        </h1>
        <img
          src={"https://images.sympla.com.br/61f187a3d8cb3-xs.jpg"}
          className="w-full self-center pt-2"
          alt="imagem"
        />
      </div>
      <p className="mt-2 py-4">{event?.description}</p>
      <p className="pt-4">
        Inicio:
        {` ${formattedData.startDate} as ${formattedData.startTime} Horas`}{" "}
      </p>
      <p className="">
        Término:{` ${formattedData.endDate} ${formattedData.endTime} Horas`}{" "}
      </p>
      <p className="pt-4">Local:{` ${event?.local_name}`} </p>
      <p className="pb-4">
        Endereço:
        {` ${event?.adress?.street}, ${event?.adress?.number} ${event?.adress?.neighborhood} -  ${event?.city?.name} ${event?.city?.state}`}
      </p>
      <div className="mb-8 grid grid-cols-2 gap-4">
        <Link href="/">
          <Button title="INGRESSOS" />
        </Link>
        <Link href="/">
          <Button title="CHAT" />
        </Link>
        <Link href="/">
          <Button title="CONTATO" />
        </Link>
        <Link href="/">
          <Button title="UBER" />
        </Link>
      </div>
    </div>
  );
};

export default eventDetail;
