import React from "react";
import Button from "../button/Button";

type Props = {
  text: string;
  action: () => void;
};

const PopUpMessage = ({ text, action }: Props) => {
  return (
    <div className="fixed left-1/2 top-1/2 flex h-fit w-[360px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border-2 border-roxo2 bg-slate-50">
      <div className="flex h-fit w-full flex-col items-center">
        <img
          src="../../../public/periLogo.png"
          className="mt-4 w-32"
          alt="imagem"
        />
      </div>
      <p className="text-lgf bold pb-2 font-sans font-semibold italic">
        Fun Guide
      </p>
      <h3 className="px-4 pb-10 pt-2 font-serif text-xl font-bold italic text-verde">
        {text}
      </h3>
      <div onClick={action} className="mb-12">
        <Button title="OK" width="24" padding="p-3" />
      </div>
    </div>
  );
};

export default PopUpMessage;
