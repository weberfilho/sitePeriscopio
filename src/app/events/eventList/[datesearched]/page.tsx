"use client";

import api from "@/api/api";
import EventCard from "@/components/cards/EventCard";
import CityIdStoraged from "@/components/cityIdStoraged/CityIdStoraged";
import PopUp from "@/components/popup/Popup";
import PopUpMessage from "@/components/popUpMessage/page";
import { EventShortData } from "@/interfaces/event";
import { useCityStorage } from "@/storage/city";

import { format } from "date-fns";

import { ptBR } from "date-fns/locale";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Props {
  params: { datesearched: Date };
}

const eventList = ({ params }: Props) => {
  const [events, setEvents] = useState<EventShortData[]>([]);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const cityId = useCityStorage().cityId;

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
      console.error("Erro getPlaces:", error);
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
              action={() => setIsPopUpVisible(false)}
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
                  startDate={event.start_date}
                  urlImage={"https://images.sympla.com.br/61f187a3d8cb3-xs.jpg"}
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
