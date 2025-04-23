"use client";

import Button from "@/components/button/Button";

import { SentComment, ShortDataComment } from "@/interfaces/comment";
import Link from "next/link";
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useForm, SubmitHandler } from "react-hook-form";
import PopUp from "@/components/popup/Popup";
import PopUpMessage from "@/components/popUpMessage/page";
import createApiInstance from "@/api/api";
import { useUserStorage } from "@/storage/user";

interface Props {
  params: { idplace: number };
}

const Assessment = ({ params }: Props) => {
  const [score, setScore] = useState(0);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  const handleScore = (data: number) => {
    console.log(data);
    setScore(data);
  };

  const api = createApiInstance();
  const { userId } = useUserStorage();

  const onSubmit: SubmitHandler<ShortDataComment> = async (data) => {
    try {
      const response = await api.post("sentcomment", {
        user_id: userId,
        comment_text: data.assessment,
        place_id: params.idplace,
        score: score,
      });
      if (response.status === 200) {
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
    <div className="mb-8 mt-4 flex flex-col px-8">
      <h1 className="px-4 text-center font-serif text-4xl font-bold">
        Avaliar Local
      </h1>
      <div className="mb-8 mt-4 flex w-full flex-row justify-center">
        <Rating SVGstyle={{ display: "inline" }} onClick={handleScore} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <legend className="mt-4">Digite seu comentário:</legend>
        <input
          type="text"
          className="flex min-h-48 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
          {...register("assessment", { required: true })}
        />
        {errors.score && (
          <p className="text-red-700">Este campo deve ser preenchido</p>
        )}
        <div className="mt-16 grid grid-cols-2 gap-8">
          <Link href="/places/placeDetail/1">
            <Button title="CANCELAR" />
          </Link>

          <Button title="ENVIAR" type="submit" />
        </div>
      </form>
      {isPopUpVisible && requestSuccess ? (
        <PopUp isVisible={isPopUpVisible}>
          <PopUpMessage
            text="Seu comentário foi enviado com sucesso. Obrigado por ajudar a construir uma comunidade cada vez melhor"
            action={() => setIsPopUpVisible(false)}
          />
        </PopUp>
      ) : (
        <PopUp isVisible={isPopUpVisible}>
          <PopUpMessage
            text="Tivemos alguns problemas ao enviar seu comentário. Por favor tente outra vez"
            action={() => setIsPopUpVisible(false)}
          />
        </PopUp>
      )}
    </div>
    // </div>
  );
};

export default Assessment;
