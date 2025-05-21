"use client";

import React, { useEffect, useState } from "react";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/api/api";
import { useCityStorage } from "@/storage/city";
import City from "@/interfaces/city";
import Button from "../button/Button";
import createApiInstance from "@/api/api";

type formData = {
  city: string;
};

const validationSchema = zod.object({
  city: zod.string().min(3, { message: "Digite no minimo três caracteres" }),
});

export const CitiesMenu = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(validationSchema) });

  const [cities, setCities] = useState<City[]>([]);
  // const [filteredCities, setFilteredCities] = useState<City[]>([]);
  // let filteredCities: City[] = [];
  const searchTerm = watch("city");
  const filteredCities =
    searchTerm.length && searchTerm.length >= 3
      ? cities.filter((city) =>
          city.name.toLowerCase().startsWith(searchTerm.toLowerCase()),
        )
      : [];
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { setCity } = useCityStorage();

  const api = createApiInstance();

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

  function handleSend(data: formData) {
    console.log(data);
  }

  useEffect(() => {
    getCities();
  }, []);

  // useEffect(() => {
  //   // const searchTerm = watch("city");
  //   if (searchTerm.length >= 3) {
  //     const filtered = cities.filter((city) =>
  //       city.name.toLowerCase().startsWith(searchTerm.toLowerCase()),
  //     );
  //     setFilteredCities(filtered);
  //     // filteredCities = filtered;
  //     setShowSuggestions(true);
  //   } else {
  //     setShowSuggestions(false);
  //   }
  // }, [watch("city"), cities]);

  return (
    <div className="h-full rounded-lg border-4 border-roxo2 bg-slate-50">
      <div className="flex w-full flex-col items-center">
        <img src="/logoPeriscopio.jpg" className="mt-4 w-32" alt="imagem" />
      </div>
      <p className="text-lgf bold pb-2 text-center font-sans font-semibold italic">
        Fun Guide
      </p>

      <h1 className="px-4 pb-10 pt-4 font-serif text-xl font-bold italic text-verde">
        Saia das profundezas e venha ver o que rola na superfície
      </h1>
      <form className="mx-4 mb-24" onSubmit={handleSubmit(handleSend)}>
        <div>
          <span>Selecione a cidade: </span>
          {errors && (
            <span style={{ color: "blue" }}>{errors.city?.message}</span>
          )}
          <div className="flex flex-row justify-between">
            <input
              {...register("city")}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-9/12 border-2 border-black"
            />

            <Button title="OK" padding="p-1" width="w-2/12" />
          </div>
          {filteredCities.length && filteredCities.length > 0 && (
            <ul>
              {filteredCities.map((city: City) => (
                <li
                  key={city.id}
                  onClick={() => {
                    setCity(city.id, city.name);
                    setShowSuggestions(false);
                  }}
                >
                  {city.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
};

export default CitiesMenu;
