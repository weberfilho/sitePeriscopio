"use client";

import createApiInstance from "@/api/api";
import Button from "@/components/button/Button";
import { SignInData } from "@/interfaces/user";
import { useTokenStorage } from "@/storage/token";
import { useUserStorage } from "@/storage/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(validationData),
  });

  const api = createApiInstance();
  const router = useRouter();

  const { setToken } = useTokenStorage();
  const { setUserData } = useUserStorage();

  const handleLogin: SubmitHandler<SignInData> = async (formData) => {
    try {
      const { status, data } = await api.post("auth/login", {
        email: formData.email,
        password: formData.password,
      });
      if (status === 200) {
        console.log("voce esta logado");
        setToken(data.authToken);
        const { status, data: userData } = await api.get("auth/me");
        if (status === 200 && !!userData) {
          console.log("Data:", userData);
          setUserData(userData.id, userData.name);
          router.push("/");
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
          <Link href="../signup">Esqueci minha senha</Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4">
          <Link href="/login/signup">
            <Button title="CADASTRAR" />
          </Link>

          <Button title="ENTRAR" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
