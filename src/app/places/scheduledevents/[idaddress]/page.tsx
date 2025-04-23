"use client";

import createApiInstance from "@/api/api";
import api from "@/api/api";
import EventCard from "@/components/cards/EventCard";
import PopUp from "@/components/popup/Popup";
import PopUpMessage from "@/components/popUpMessage/page";
import { EventShortData } from "@/interfaces/event";
import { useCityStorage } from "@/storage/city";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  params: { idaddress: number };
};

const ScheduledEvents = ({ params }: Props) => {
  const [eventList, setEventList] = useState<EventShortData[]>([]);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const cityId = useCityStorage().cityId;
  const api = createApiInstance();

  async function getScheduledEvents() {
    try {
      const { data, status } = await api.get("scheduledevents", {
        params: {
          address_id: params.idaddress,
        },
      });
      if (status === 200) {
        setEventList(data);
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
    getScheduledEvents();
  }, [cityId]);

  return (
    <div className="flex-1">
      <h1 className="p-4 text-center font-serif text-4xl font-bold italic">
        Eventos Agendados
      </h1>
      {isPopUpVisible && (
          <PopUp isVisible={isPopUpVisible}>
            <PopUpMessage
              text="Não existem eventos cadastrados para esta estabelecimento"
              action={() => setIsPopUpVisible(false)}
            />
          </PopUp>
        )}

      <ul>
        {eventList.map((event) => (
          <li key={event.id} className="mx-2">
            <Link href={`../../events/eventDetail/${event.id}`}>
              <EventCard
                name={event.name}
                local={event.local_name}
                startDate={event.start_date}
                urlImage="https://images.sympla.com.br/61f187a3d8cb3-xs.jpg"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduledEvents;
