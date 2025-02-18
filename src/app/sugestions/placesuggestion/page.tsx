"use client";

import api from "@/api/api";
import Button from "@/components/button/Button";
import PopUp from "@/components/popup/Popup";
import PopUpMessage from "@/components/popUpMessage/page";
import { PlaceSuggestion } from "@/interfaces/place";

import Link from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const SuggestionPlace = () => {
  const [placeSuggested, setPlaceSuggested] = useState<PlaceSuggestion>();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PlaceSuggestion>();

  const onSubmit: SubmitHandler<PlaceSuggestion> = async (data) => {
    
    try {
      const response = await api.post("placesuggestion", data);
      if (response.status === 200) {
        setPlaceSuggested(data);
        setIsPopUpVisible(true);
        setRequestSuccess(true);
      } else {
        setIsPopUpVisible(true);
        setRequestSuccess(false);
      }
    } catch (error) {
      console.error("Erro getPlaces:", error);
    } finally {
    }
  };
  return (
    <div className="mb-8 px-8">
      <div className="flex flex-col">
        <h1 className="mt-4 size-fit self-center pb-2 font-serif text-4xl font-semibold italic">
          Sugerir Local
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <legend className="mt-4">Nome do Estabelecimento:</legend>
        <input
          type="text"
          className="flex min-h-12 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <p className="text-red-700">Este campo deve ser preenchido</p>
        )}

        <legend className="mt-2">Cidade do Estabelecimento:</legend>
        <input
          type="text"
          className="flex min-h-12 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
          {...register("city", { required: true })}
        />
        {errors.city && (
          <p className="text-red-600">Este campo deve ser preenchido</p>
        )}

        <legend className="mt-2">Descrição (endereço, atrações etc):</legend>
        <input
          type="text"
          className="flex min-h-52 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <p className="text-red-700">Este campo deve ser preenchido</p>
        )}

        <legend className="mt-2">Telefone para Contato (opcional):</legend>
        <input
          type="number"
          className="flex min-h-12 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
          {...register("contact", { required: false })}
        />
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Link href="/sugestions/sugestionsearch">
            <Button title="CANCELAR" />
          </Link>

          <Button type="submit" title="ENVIAR" />
        </div>
      </form>
      {isPopUpVisible && requestSuccess ? (
        <PopUp isVisible={isPopUpVisible}>
          <PopUpMessage
            text="Sua sugestão foi enviada com sucesso. Obrigado por ajudar a construir uma comunidade cada vez melhor"
            action={() => setIsPopUpVisible(false)}
          />
        </PopUp>
      ) : (
        <PopUp isVisible={isPopUpVisible}>
          <PopUpMessage
            text="Tivemos alguns problemas ao enviar a sua sugestão. Por favor tente outra vez"
            action={() => setIsPopUpVisible(false)}
          />
        </PopUp>
      )}
    </div>
  );
};

export default SuggestionPlace;
