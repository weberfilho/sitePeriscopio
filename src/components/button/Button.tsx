import React from "react";

type ButtonType = "button" | "submit";

type Props = {
  type?: ButtonType;
  title: string;
  width?: string;
  padding?: string;
  click?: () => any;
};

const Button = ({
  type = "button",
  title,
  width = "w-full",
  padding = "px-2 py-6",
}: Props) => {
  return (
    <button
      type={type}
      className={`rounded-xl bg-gradient-to-br from-roxo2 via-cyan-700 to-verde text-xl text-white ${width} ${padding}`}
    >
      {title}
    </button>
  );
};
export default Button;
