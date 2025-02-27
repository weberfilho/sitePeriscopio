// import api from "@/api/api";
// import { ReceiveidMessage } from "@/interfaces/chatmessage";
// import React, { useEffect, useState } from "react";

// type Props = {
//   eventid: number;
// };

// const Chat = ({ eventid }: Props) => {
//   const [messages, setMessages] = useState<ReceiveidMessage[]>([]);
//   const [input, setInput] = useState<string>("");

//   async function getMessages() {
//     try {
//       const { data, status } = await api.get("getmessages", {
//         params: {
//           event_id: eventid,
//         },
//       });
//       if (status === 200) {
//         setMessages(data);
//         if (data.length === 0) {
//           //setIsPopUpVisible(true);
//         }
//       }
//     } catch (error) {
//       console.error("Erro getPlaces:", error);
//     } finally {
//     }
//   }

//   useEffect(() => {
//     getMessages();
//   }, []);

//   const imprime = () => console.log(messages);

//   return (
//     <div className="flex h-screen flex-col p-4">
//       <div className="mb-4 flex-1 overflow-y-auto">
//         {messages.map((msg, index) => (
//           <div key={index} className="mb-2 rounded bg-blue-500 p-2 text-white">
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="flex">
//         <input
//           type="text"
//           className="flex-1 rounded border p-2"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           //onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//         />
//         <button
//           className="ml-2 rounded bg-blue-500 p-2 text-white"
//           onClick={imprime}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
