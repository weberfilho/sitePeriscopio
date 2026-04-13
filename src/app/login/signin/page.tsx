"use client";

import React, { useState } from "react";
import createApiInstance from "@/api/api";
import Button from "@/components/button/Button";
import { SignInData } from "@/interfaces/user";
import { useTokenStorage } from "@/storage/token";
import { useUserStorage } from "@/storage/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import PopUp from "@/components/popup/Popup";
import PopUpMessage from "@/components/popUpMessage/page";

const validationData = z.object({
  email: z.string().email("Digite um e-mail válido"),
  password: z
    .string()
    .nonempty("Campo obrigatório")
    .min(4, { message: "Mínimo de 4 caracteres" }),
});

const SignIn = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(validationData),
  });

  const api = createApiInstance();
  const router = useRouter();
  const { setToken } = useTokenStorage();
  const { setUserData } = useUserStorage();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [auxPopUp, setAuxPopUp] = useState(false);

  function closePopUp() {
    setIsPopUpVisible(false);
    // router.back();
    router.push("/");
  }

  const getUserData = async () => {
    const { status, data } = await api.get("auth/me");
    if (status === 200 && !!data) {
      setUserData(data.id, data.name);
    }
  };

  const handleLogin: SubmitHandler<SignInData> = async (formData) => {
    try {
      const { status, data } = await api.post("auth/login", {
        email: formData.email,
        password: formData.password,
      });
      if (status === 200) {
        setToken(data.authToken);
        const { status, data: userData } = await api.get("auth/me");
        if (status === 200 && userData) {
          setUserData(userData.id, userData.name);
          setIsPopUpVisible(true);
        }
      }
    } catch (error) {
      console.error("SignUp, onSubmit error:", error);

      //to do adicionar mensagem de erro
    } finally {
      reset();
    }
  };

  return (
    <div className="mb-8 content-center px-8">
      <div className="flex flex-col">
        <h1 className="mt-4 size-fit self-center pb-2 font-serif text-4xl font-semibold italic">
          Login
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mt-8">
          <legend className="mt-4">Email:</legend>

          <input
            className="flex min-h-12 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-700">{errors.email.message}</p>
          )}
          <legend className="mt-4">Senha:</legend>

          <input
            className="flex min-h-12 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-700">{errors.password.message}</p>
          )}
          <div className="mt-2" onClick={() => setAuxPopUp(true)}>
            Esqueci minha senha
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4">
          <Link href="/login/signup">
            <Button title="CADASTRAR" />
          </Link>

          <Button title="ENTRAR" type="submit" />
        </div>
      </form>
      {isPopUpVisible && (
        <PopUp isVisible={isPopUpVisible}>
          <PopUpMessage
            text={"Login realizado com sucesso"}
            action={() => closePopUp()}
          />
        </PopUp>
      )}
      {auxPopUp && (
        <PopUp isVisible={true}>
          <PopUpMessage
            text={
              "Para recuperar sua senha envie um email para weberfilho@hotmail.com com o título Recuperar Senha"
            }
            action={() => setAuxPopUp(false)}
          />
        </PopUp>
      )}
    </div>
  );
};

export default SignIn;
