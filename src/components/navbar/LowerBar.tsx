import Link from "next/link";
import React from "react";


{/* <nav className="mt-4 grid grid-cols-5 justify-items-center gap-2 py-8"> */}

const LowerBar = () => {
  return (    
      <nav className="fixed bottom-0 left-0 w-full grid grid-cols-5 gap-2 mt-0 py-4 bg-white justify-items-center shadow-lg z-10">
        <Link href="/">
          <img src="/home.ico" className="w-8 self-center pt-2" alt="imagem" />
        </Link>
        <Link href="/sugestions/sugestionsearch">
          <img
            src="/sugestion.ico"
            className="w-8 self-center pt-2"
            alt="imagem"
          />
        </Link>

        <img src="/city.ico" className="w-8 self-center pt-2" alt="imagem" />

        <Link href="/places/niverplaces">
          <img
            src="/birthday2.ico"
            className="w-8 self-center pt-2"
            alt="imagem"
          />
        </Link>
        <Link href="/login/signin">
          <img
            src="/profile.ico"
            className="w-8 self-center pt-2"
            alt="imagem"
          />
        </Link>
      </nav>    
  );
};
export default LowerBar;
