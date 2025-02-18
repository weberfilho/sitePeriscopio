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
    <div className="flex h-full flex-col rounded-lg border-4 border-roxo2 bg-slate-50">
      <div className="flex w-full flex-col items-center">
        <img src="/logoPeriscopio.jpg" className="mt-4 w-32" alt="imagem" />
      </div>

      <span className="ml-4 mt-8">Selecione a data do evento: </span>
      <div className="ml-4 mr-8 mb-52 flex flex-row justify-between">
        <DatePicker
          className="min-h-8 rounded-md border-2 border-solid border-black"
          selected={selectedDate}
          onSelect={handleDataChange}
          dateFormat={"dd-MM-yyyy"}
        />

        <Link href={`../../events/eventList/${parameterDate}`} onClick={action}>
          
        <Button title="OK" width="20" padding="p-4" />
          
          {/* <button
            className="h-12 w-16 rounded-xl bg-gradient-to-br from-roxo2 via-cyan-700 to-verde text-xl text-white"
            onClick={action}
          >
            OK
          </button> */}
        </Link>
      </div>
    </div>
  );
};

export default Calendar;
