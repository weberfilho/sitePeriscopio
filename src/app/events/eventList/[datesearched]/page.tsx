"use client";

import createApiInstance from "@/api/api";
import api from "@/api/api";
import EventCard from "@/components/cards/EventCard";
import PopUp from "@/components/popup/Popup";
import PopUpMessage from "@/components/popUpMessage/page";
import { EventShortData } from "@/interfaces/event";
import { useCityStorage } from "@/storage/city";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: { datesearched: Date };
}

const eventList = ({ params }: Props) => {
  const [events, setEvents] = useState<EventShortData[]>([]);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const cityId = useCityStorage().cityId;
  const api = createApiInstance();
  const router = useRouter();

  function buttonAction() {
    setIsPopUpVisible(false);
    router.back();
  }

  async function getEvents() {
    try {
      const { data, status } = await api.get("events", {
        params: {
          city_id: cityId,
          start_date: params.datesearched,
        },
      });

      if (status === 200) {
        setEvents(data);
        if (data.length === 0) {
          setIsPopUpVisible(true);
        }
      }
    } catch (error) {
      setIsPopUpVisible(true);
    } finally {
    }
  }

  useEffect(() => {
    getEvents();
  }, [cityId]);

  return (
    <div>
      <div>
        <h1 className="p-10 text-center font-serif text-2xl font-bold">
          {"FESTAS E EVENTOS"}
        </h1>
        {isPopUpVisible && (
          <PopUp isVisible={isPopUpVisible}>
            <PopUpMessage
              text="Não existem eventos cadastrados para esta data"
              action={() => buttonAction()}
            />
          </PopUp>
        )}
        <ul>
          {events.map((event) => (
            <li key={event.id} className="mx-2">
              <Link href={`../../../events/eventDetail/${event.id}`}>
                <EventCard
                  name={event.name}
                  local={event.local_name}
                  startDate={format(
                    parseISO(event.start_date as string),
                    "dd/MM - EEEE",
                    {
                      locale: ptBR,
                    },
                  )}
                  urlImage={event.event_image.url}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default eventList;
