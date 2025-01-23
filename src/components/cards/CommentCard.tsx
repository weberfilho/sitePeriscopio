import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import React from "react";
import { Rating } from "react-simple-star-rating";

interface Comment {
  id: number;
  userName: string;
  commentText: string;
  rating: number;
  date: string | Date;
}

const CommentCard = (props: Comment) => {
  const formattedDate = format(props.date, "dd/MM/yy", {
    locale: ptBR,
  });
  return (
    <div className="my-2 flex flex-col rounded-xl border-2 border-solid border-black px-2 py-1 shadow-md shadow-gray-500">
      <div className="flex w-full flex-row justify-between">
        <h1 className="font-serif text-2xl font-bold italic">
          {props.userName}
        </h1>
        <Rating
          initialValue={props.rating}
          readonly
          SVGstyle={{ display: "inline" }}
        />
      </div>
      <p>{props.commentText}</p>

      <div className="flex w-full flex-col p-2">
        <h3 className="mt-2 flex flex-row justify-end text-lg">
          {formattedDate}
        </h3>
      </div>
    </div>
  );
};

export default CommentCard;
