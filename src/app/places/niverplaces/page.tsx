"use client";

import createApiInstance from "@/api/api";
import NiverCard from "@/components/cards/NiverCard";
import NiverData from "@/interfaces/niverplacesdata";
import { useCityStorage } from "@/storage/city";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NiverPlaces = () => {
  const [niverPromoPlaces, setNiverPromoPlaces] = useState<NiverData[]>([]);
  const cityId = useCityStorage().cityId;

  const api = createApiInstance();

  async function getNiverPromo() {
    try {
      const { data, status } = await api.get("niverpromo", {
        params: {
          city_id: cityId,
        },
      });
      if (status === 200) {
        setNiverPromoPlaces(data);
      }
    } catch (error) {
      console.error("Erro getPlaces:", error);
    } finally {
    }
  }

  useEffect(() => {
    getNiverPromo();
  }, [cityId]);

  return (
    <div>
      <h1 className="text-center font-serif text-2xl font-bold">PROMOÇAO</h1>
      <h1 className="p-4 pt-1 text-center font-serif text-2xl font-bold">
        ANIVERSARIANTES
      </h1>
      <div className="h-dvh overflow-auto">
        <ul className="">
          {niverPromoPlaces.map((promo) => (
            <li key={promo.id} className="mx-2">
              <Link href={`../../places/placeDetail/${promo.id}`}>
                <NiverCard
                  namePlace={promo.name}
                  promoDescription={promo.niver_promo}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NiverPlaces;
