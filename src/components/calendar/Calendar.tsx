"use client";

import React, { useState } from "react";
import Button from "../button/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import { format } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";

type Props = {
  action: () => void;
};

const Calendar = ({ action }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [parameterDate, setParameterDate] = useState<string>("");

  const DadosFormatados = (value: any) => {
    var valor = format(value, "yyyy-MM-dd");
    setParameterDate(valor);
  };

  const handleDataChange = (data: any) => {
    setSelectedDate(data);
    DadosFormatados(data);
  };

  return (
    // <div className="flex h-full flex-col items-center rounded-lg border-4 border-roxo2 bg-slate-50">
    <div className="fixed left-1/2 top-1/2 flex h-fit w-[360px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border-2 border-roxo2 bg-slate-50">
      <div className="flex w-full flex-col items-center">
        <img src="/periLogo.png" className="mt-4 w-32" alt="imagem" />
      </div>

      <span className="mb-6 ml-4 mt-8 font-serif text-xl font-bold italic text-verde">
        Selecione a data do evento:
      </span>
      {/* <div className="mb-52 flex w-3/5 flex-col justify-center"> */}
      <DatePicker
        className="min-h-8 w-fit rounded-md border-2 border-solid border-black"
        selected={selectedDate}
        onSelect={handleDataChange}
        dateFormat={"dd/MM/yyyy"}
        inline
        locale={ptBR}
      />

      <Link
        href={`../../events/eventList/${parameterDate}`}
        onClick={action}
        className="mb-4 mt-8"
      >
        <Button title="OK" width="20" padding="p-2" />
      </Link>
      {/* </div> */}
    </div>
  );
};

export default Calendar;
