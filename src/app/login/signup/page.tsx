"use client";

import React, { useState } from "react";

import { z } from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/button/Button";

import api from "@/api/api";

import { SignUpData } from "@/interfaces/user";
import PopUp from "@/components/popup/Popup";
import PopUpMessage from "@/components/popUpMessage/page";
import createApiInstance from "@/api/api";

const validationData = z
  .object({
    name: z.string().nonempty("Campo obrigatório"),
    birthday: z.string().nonempty("Campo obrigatório"),
    sex: z.string().nonempty("Campo obrigatório"),
    email: z.string().email("Digite um e-mail válido"),
    password: z
      .string()
      .nonempty("Campo obrigatório")
      .min(4, { message: "Mínimo de 4 caracteres" }),
    confirmPassword: z.string().nonempty("Campo obrigatório"),
  })
  .refine((FormData) => FormData.password === FormData.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(validationData),
  });

  const api = createApiInstance();

  const formatDate = (value: string) => {
    value = value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);

    value = value.replace(/(\d{2})(\d)/, "$1/$2");
    value = value.replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");

    return value;
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatDate(e.target.value);

    setValue("birthday", formattedValue);
  };

  const onSubmit: SubmitHandler<SignUpData> = async (formData) => {
    try {
      const { status, data } = await api.post("auth/signup", {
        name: formData.name,
        birthday: formData.birthday.replace("/", "-").replace("/", "-"),
        sex: formData.sex,
        email: formData.email,
        password: formData.password,
      });
      if (status === 200) {
        setIsPopUpVisible(true);
        setRequestSuccess(true);
      } else {
        setIsPopUpVisible(true);
        setRequestSuccess(false);
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
          Cadastrar
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <legend className="mt-4">Nome:</legend>
        <input
          className="flex min-h-12 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
          {...register("name")}
        />
        {errors.name && <p className="text-red-700">{errors.name.message}</p>}

        <div className="flex w-full flex-row justify-between">
          <div className="mr-0 w-3/5">
            <legend className="mt-4">Nascimento(dd/mm/aaaa):</legend>
            <input
              className="flex min-h-12 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
              type="date"
              {...register("birthday")}
              // {...register("birthday", {
              //   onChange: (event) => {
              //     handleChangeDate(event);
              //   },
              // })}
            />
            {errors.birthday && (
              <p className="text-red-700">{errors.birthday.message}</p>
            )}
          </div>

          <div className="w-1/4">
            <legend className="mt-4">Sexo:</legend>
            <select
              className="flex min-h-12 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
              {...register("sex")}
            >
              <option value=""> </option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
            {errors.sex && <p className="text-red-700">{errors.sex.message}</p>}
          </div>
        </div>

        <legend className="mt-4">Email:</legend>
        <input
          className="flex min-h-12 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
          type="email"
          {...register("email")}
        />
        {errors.email && <p className="text-red-700">{errors.email.message}</p>}

        <legend className="mt-4">Senha:</legend>
        <input
          className="flex min-h-12 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-700">{errors.password.message}</p>
        )}

        <legend className="mt-4">Confirmar senha:</legend>
        <input
          className="flex min-h-12 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-700">{errors.confirmPassword.message}</p>
        )}

        <div className="mt-12 grid grid-cols-2 gap-4">
          <Link href="/">
            <Button title="CANCELAR" />
          </Link>

          <Button title="ENVIAR" type="submit" />
        </div>
      </form>
      {isPopUpVisible && requestSuccess ? (
        <PopUp isVisible={isPopUpVisible}>
          <PopUpMessage
            text="Seu cadastro foi realizado com sucesso com sucesso. Clique no link enviado para o seu email para viabilizar o seu acesso"
            action={() => setIsPopUpVisible(false)}
          />
        </PopUp>
      ) : (
        <PopUp isVisible={isPopUpVisible}>
          <PopUpMessage
            text="Tivemos alguns problemas ao efetuar o seu cadastro. Por favor tente outra vez"
            action={() => setIsPopUpVisible(false)}
          />
        </PopUp>
      )}
    </div>
  );
};

export default SignUp;
