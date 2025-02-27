import { ChatData } from "@/interfaces/chatmessage";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import React from "react";

const ChatCard = (props: ChatData) => {
  const formattedDate = format(props.date, "dd/MM/yy", {
    locale: ptBR,
  });
  const formattedTime = format(props.date, "HH:mm", {
    locale: ptBR,
  });
  return (
    <div
      className={`border- my-2 flex flex-col rounded-sm border-2 border-solid ${props.id % 2 == 0 ? "border-green-600" : "border-purple-500"} px-2 py-1 shadow-md shadow-gray-500`}
    >
      <div className="flex w-full flex-row justify-between">
        <h4 className="font-serif text-lg font-bold italic">
          {props.userName}
        </h4>
        <div>{formattedDate}</div>
      </div>
      <p>{props.message}</p>

      <div className="flex w-full flex-col p-2">
        <h3 className="text-md mt-2 flex flex-row justify-end">
          {formattedTime}
        </h3>
      </div>
    </div>
  );
};

export default ChatCard;
