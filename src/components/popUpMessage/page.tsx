import React from "react";
import Button from "../button/Button";
import Link from "next/link";

type Props = {
  text: string;
  action: () => void;
};

const PopUpMessage = ({ text, action }: Props) => {
  return (
    <div className="flex h-4/5 flex-col items-center rounded-lg border-4 border-roxo2 bg-slate-50">
      <div className="flex h-fit w-full flex-col items-center">
        <img src="/logoPeriscopio.jpg" className="mt-4 w-32" alt="imagem" />
      </div>
      <p className='text-lgf pb-2 font-semibold font-sans italic bold'>Fun Guide</p>
      <h3 className="px-4 py-10 font-serif text-xl font-bold italic text-verde">
        {text}
      </h3>
      <Link href="/" onClick={action} className="mb-12">
        <Button title="OK" width="24" padding="p-3" />
        
      </Link>
    </div>
  );
};

export default PopUpMessage;
