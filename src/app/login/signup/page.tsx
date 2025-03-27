"use client";

import api from "@/api/api";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { SignUpData } from "@/interfaces/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { InputMask } from "@react-input/mask";

const validationData = z
  .object({
    name: z.string().nonempty("Campo obrigatorio"),
    birthday: z.string().nonempty("Campo obrigatorio"),
    sex: z.string().nonempty("Campo obrigatorio"),
    email: z.string().email(),
    password: z
      .string()
      .nonempty("Campo Obrigatorio")
      .min(4, { message: "Minimo de 4 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((FormData) => FormData.password === FormData.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<validationData>({ resolver: zodResolver(validationData) });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    watch,
    reset,
  } = useForm<SignUpData>({
    resolver: zodResolver(validationData),
    defaultValues: {
      birthday: "00/00/0000",
    }, // Apply the zodResolver
  });

  const {
    ref,
    onChange: registerOnChange,
    ...rest
  } = register("birthday", {
    required: "Campo obrigatório",
    pattern: {
      value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      message: "Formato inválido (DD/MM/AAAA)",
    },
  });

  const formatDate = (value: string) => {
    value = value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);

    value = value.replace(/(\d{2})(\d)/, "$1/$2");
    value = value.replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");

    return value;
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatDate(e.target.value);
    const newEvent = {
      ...e,
      target: {
        ...e.target,
        value: formattedValue,
      },
    };

    registerOnChange(newEvent);

    console.log("Value: ", formattedValue);
  };

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    try {
      const response = await api.post("auth/signup", {
        name: data.name,
        birthday: data.birthday,
        sex: data.sex,
        email: data.email,
        password: data.password,
      });
      if (response.status === 200) {
        setIsPopUpVisible(true);
        setRequestSuccess(true);
        console.log(data);
      } else {
        setIsPopUpVisible(true);
        setRequestSuccess(false);
      }
    } catch (error) {
      console.error("Erro:", error);
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
            {/* <InputMask
              mask="99/99/9999"
              placeholder="DD/MM/AAAA"
              className="flex min-h-12 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
              replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
              value={getValues("birthday")}
              {...register("birthday")}
            />

            {errors.birthday && (
              <p className="text-red-700">{errors.birthday.message}</p>
            )} */}
            <input
              className="flex min-h-12 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
              {...rest}
              onChange={handleChangeDate}
              ref={ref}

              // {...register("birthday")}
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
          {...register("email")}
        />
        {errors.email && <p className="text-red-700">{errors.email.message}</p>}
        <legend className="mt-4">Senha:</legend>
        <input
          className="flex min-h-12 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-700">{errors.password.message}</p>
        )}
        <legend className="mt-4">Confirmar senha:</legend>
        <input
          className="flex min-h-12 w-full flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
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
    </div>
  );
};

export default SignUp;
