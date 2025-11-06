"use client";

import createApiInstance from "@/api/api";
import Button from "@/components/button/Button";
import ChatCard from "@/components/cards/ChatCard";
import PopUp from "@/components/popup/Popup";
import PopUpMessage from "@/components/popUpMessage/page";
import { ReceiveidMessage, ShortDataMessage } from "@/interfaces/chatmessage";
import { useUserStorage } from "@/storage/user";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface Props {
  params: { idevent: number };
}

const EventChat = ({ params }: Props) => {
  const [messages, setMessages] = useState<ReceiveidMessage[]>([]);
  const [showInitialPopUp, setShowInitialPopUp] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  const api = createApiInstance();
  const { userId } = useUserStorage();
  const router = useRouter();

  function auxCheckLogin() {
    setShowInitialPopUp(false);
    router.push("/login/signin");
  }

  function checkLogin() {
    userId == null ? setShowInitialPopUp(true) : setShowInitialPopUp(false);
  }

  async function getChatMessages() {
    try {
      const { data, status } = await api.get("getmessages", {
        params: {
          event_id: params.idevent,
        },
      });

      if (status === 200) {
        setMessages(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
    }
  }
  useEffect(() => {
    getChatMessages();
  }, []);
  useEffect(() => checkLogin(), [userId]);

  const onSubmit: SubmitHandler<ShortDataMessage> = async (data) => {
    try {
      const response = await api.post("postmessage", {
        user_id: userId,
        text: data.textmessage,
        event_id: params.idevent,
      });
      if (response.status === 200) {
        getChatMessages();
        console.log("Mensagens", messages);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Erro postMessage:", error);
    } finally {
      reset();
    }
  };

  return (
    <div className="mb-8 px-2">
      <div className="mb-8 mt-4 flex flex-col">
        <h1 className="px-4 text-center font-serif text-4xl font-bold">Chat</h1>
        <h3 className="px-4 text-center font-serif text-2xl font-bold italic">
          {messages[0]?.event.name}
        </h3>
      </div>
      <ul className="mb-8">
        {messages?.length &&
          messages.length > 0 &&
          messages.map((message, index) => (
            <li key={message.id} className="mx-2">
              <ChatCard
                id={message.id}
                userName={message.user.name}
                message={message.text}
                date={message.created_at}
              />
            </li>
          ))}
      </ul>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row space-x-4 px-2"
      >
        <input
          type="text"
          placeholder=""
          className="flex h-12 w-10/12 flex-row rounded-md border-2 border-solid border-black px-4 shadow-md shadow-gray-500"
          {...register("textmessage", { required: true })}
        />
        {errors.score && (
          <p className="text-red-700">Este campo deve ser preenchido</p>
        )}

        <Button title="OK" type="submit" width="w-12" padding="p-2" />
      </form>
      {showInitialPopUp && (
        <PopUp isVisible={showInitialPopUp}>
          <PopUpMessage
            text="Para participar do chat é necessário estar logado"
            action={() => auxCheckLogin()}
          />
        </PopUp>
      )}
    </div>
  );
};

export default EventChat;
