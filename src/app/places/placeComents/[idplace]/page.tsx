"use client";
import Button from "@/components/button/Button";
import CommentCard from "@/components/cards/CommentCard";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { Comment } from "@/interfaces/comment";
import api from "@/api/api";

interface Props {
  params: { idplace: number };
}

const CommentsList = ({ params }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [average, setAverage] = useState<number>(0);

  useEffect(() => {
    async function fetchComments() {
      try {
        const { data, status } = await api.get("comments", {
          params: {
            place_id: params.idplace,
          },
        });
        //console.log("Data:", data);

        if (status === 200) {
          setComments(data.comments);
          setAverage(data.average);
        }
      } catch (error) {
        console.error("placeDetail error:", error);
      } finally {
      }
    }
    fetchComments();
  }, []);

  return (
    <div className="mb-8 px-2">
      <div className="mb-8 mt-4 flex flex-col">
        <h1 className="px-4 text-center font-serif text-4xl font-bold">
          {comments[0]?.place.name}
        </h1>
        <div className="flex w-full flex-row justify-center">
          <Rating
            initialValue={average}
            readonly
            SVGstyle={{ display: "inline" }}
          />
        </div>
        <p className="w-fit self-center">{`(${comments?.length ? comments?.length : 0} Comentarios)`}</p>
      </div>
      <ul className="mb-8">
        {comments?.length &&
          comments.length > 0 &&
          comments.map((comment) => (
            <li key={comment.id} className="mx-2">
              <CommentCard
                id={comment.id}
                userName={comment.user.name}
                commentText={comment.comment_text}
                rating={comment.score}
                date={comment.created_at}
              />
            </li>
          ))}
      </ul>
      <Link href={`/places/placeAssessment/${params.idplace}`} className="">
        <Button title="AVALIAR ESTE LOCAL" />
      </Link>
    </div>
  );
};

export default CommentsList;
