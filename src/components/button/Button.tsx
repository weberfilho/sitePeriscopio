import React from "react";

type ButtonType = "button" | "submit";

type Props = {
  type?: ButtonType;
  title: string;
  width?: string;
  padding?: string;
};

const Button = ({
  type = "button",
  title,
  width = "w-full",
  padding = "p-6",
}: Props) => {
  return (
    <button
      type={type}
      className={`rounded-xl bg-gradient-to-br from-roxo2 via-cyan-700 to-verde text-xl text-white ${width} ${padding}`}
    >
      {title}
    </button>
  );

  //w-full rounded-xl bg-cyan-600 bg-gradient-to-r from-roxo2 via-cyan-600 to-verde p-6 text-xl text-white
};
export default Button;
