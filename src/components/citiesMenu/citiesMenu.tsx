import React, { useEffect, useState } from "react";
import City from "@/interfaces/city";
import { useCityStorage } from "@/storage/city";
import api from "@/api/api";
import { Input } from "postcss";
import { useForm } from "react-hook-form";
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

type formData = {
  city: string

}

const validationSchema = zod.object({
  city: zod.string().min(3, {message:"Digite no minimo três caracteres"})
})

export const CitiesMenu = () => {
  const {
    register,
    handleSubmit,    
    formState: { errors },
  } = useForm<formData>({resolver: zodResolver(validationSchema)})

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

  function handleSend(data: formData){
    console.log(data)
  }
  console.log(errors.city?.message)

  useEffect(() => {
    getCities();
  }, []);

  return (
    <div className="bg-slate-50">
      <h1 className="p-10">Saia das profundezas e venha ver o que rola na superfície</h1>
      <form onSubmit={handleSubmit(handleSend)}>
        <div>
          <span>Selecione a cidade:</span>
          {errors && (<span>{errors.city?.message}</span>)}
          <div>
            <input {...register("city")} />
            <button type= "submit">Ok
            </button>
          </div>
        </div>
      </form>
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
