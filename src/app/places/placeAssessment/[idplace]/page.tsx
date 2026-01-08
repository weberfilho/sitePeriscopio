"use client";

import Button from "@/components/button/Button";

import { ShortDataComment } from "@/interfaces/comment";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useForm, SubmitHandler } from "react-hook-form";
import PopUp from "@/components/popup/Popup";
import PopUpMessage from "@/components/popUpMessage/page";
import createApiInstance from "@/api/api";
import { useUserStorage } from "@/storage/user";
import { useRouter } from "next/navigation";

interface Props {
  params: { idplace: number };
}

const Assessment = ({ params }: Props) => {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [showInitialPopUp, setShowInitialPopUp] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const handleScore = (data: number) => {
    setScore(data);
  };

  const api = createApiInstance();
  const { userId } = useUserStorage();

  function auxCheckLogin() {
    setShowInitialPopUp(false);
    router.push("/login/signin");
  }

  function auxClosePopUp() {
    setShowInitialPopUp(false);
    router.back();
  }
  function checkLogin() {
    userId == null ? setShowInitialPopUp(true) : setShowInitialPopUp(false);
  }

  useEffect(() => checkLogin(), [userId]);

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
          <div onClick={() => router.back()}>
            <Button title="CANCELAR" />
          </div>

          <Button title="ENVIAR" type="submit" />
        </div>
      </form>
      {showInitialPopUp && (
        <PopUp isVisible={showInitialPopUp}>
          <PopUpMessage
            text="Para fazer comentários é necessário estar logado"
            action={() => auxCheckLogin()}
          />
        </PopUp>
      )}

      {isPopUpVisible && requestSuccess ? (
        <PopUp isVisible={isPopUpVisible}>
          <PopUpMessage
            text="Seu comentário foi enviado com sucesso. Obrigado por ajudar a construir uma comunidade cada vez melhor"
            action={() => auxClosePopUp()}
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
