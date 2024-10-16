import React, { useEffect, useState } from "react";

import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "@/api/api";
import { useCityStorage } from "@/storage/city";

import City from "@/interfaces/city";
import Button from "../button/Button";

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
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  useEffect(() => {
    const searchTerm = watch("city");
    if (searchTerm.length >= 3) {
      const filtered = cities.filter((city) =>
        city.name.toLowerCase().startsWith(searchTerm.toLowerCase()),
      );
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [watch("city"), cities]);

  return (
    <div className="bg-slate-50 border-4 h-full border-roxo2 rounded-lg">
      <div className="w-full flex flex-col items-center">
      <img src='/logoPeriscopio.jpg' className='w-32 mt-4' alt='imagem' />
      </div>
     
      <h1 className="py-10 px-4 font-bold font-serif text-xl text-verde italic">
        Saia das profundezas e venha ver o que rola na superfície
      </h1>
      <form className="mx-4" onSubmit={handleSubmit(handleSend)}>
        <div>
          <span>Selecione a cidade: </span>
          {errors && (
            <span style={{ color: "red" }}>{errors.city?.message}</span>
          )}
          <div className="flex-row flex justify-between">
            <input
              {...register("city")}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-9/12 border-2 border-black"
            />         
              
            <Button title="OK" padding="p-1" width="w-2/12"/>
          </div>
          {showSuggestions && (
            <ul>
              {filteredCities.map((city: City) => (
                <li
                  key={city.id}
                  onClick={() => {
                    useCityStorage.getState().setCity(city.id, city.name);
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

