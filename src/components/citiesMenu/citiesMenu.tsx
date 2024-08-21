import React, { useEffect, useState } from "react";

import City from "@/interfaces/city";

import { useCityStorage } from "@/storage/city";

import api from "@/api/api";

export const CitiesMenu = () => {
  const [cities, setCities] = useState<City[]>([]);

  async function getCities() {
    try {
      const { data, status } = await api.get("city");
      if (status === 200) {
        setCities(data);
      }
    } catch (error) {
      console.error("getCitiesError", error);
    }
  }

  useEffect(() => {
    getCities();
  }, []);

  return (
    <div className="bg-slate-50">
      <h1 className="p-10">Saia das profundezas e venha ver o que rola na superfície</h1>
      {cities.map((city: City) => (
          <div
            key={city.id}
            onClick={() => {
              useCityStorage.getState().setCity(city.id, city.name);
            }}
          >
            <p>{city.name}</p>
          </div>
      ))}
    </div>
  );
};

export default CitiesMenu;
