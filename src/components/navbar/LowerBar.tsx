"use client";

import { useCityStorage } from "@/storage/city";
import Link from "next/link";
import React from "react";

const LowerBar = () => {
  const { setCity } = useCityStorage();
  function setCitySearched() {
    setCity(null, "");
  }

  return (
    <nav className="fixed bottom-0 left-0 z-10 mt-8 grid w-full grid-cols-5 justify-items-center gap-2 bg-white py-4 shadow-lg">
      <Link href="/">
        <img src="/home.ico" className="w-8 self-center pt-2" alt="imagem" />
      </Link>
      <Link href="/sugestions/sugestionsearch">
        <img
          src="/suggestions.ico"
          className="w-8 self-center pt-2"
          alt="imagem"
        />
      </Link>

      <button onClick={setCitySearched}>
        <Link href="/">
          <img src="/city.ico" className="w-8 self-center pt-2" alt="imagem" />
        </Link>
      </button>

      <Link href="/places/niverplaces">
        <img
          src="/birthday2.ico"
          className="w-8 self-center pt-2"
          alt="imagem"
        />
      </Link>
      <Link href="/login/signin">
        <img src="/profile.ico" className="w-8 self-center pt-2" alt="imagem" />
      </Link>
    </nav>
  );
};
export default LowerBar;
