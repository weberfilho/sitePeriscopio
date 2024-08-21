import React, { ReactNode } from "react";

type Props = {
  isVisible?: boolean;
  children: ReactNode;
};

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

export default function PopUp({ isVisible = true, children }: Props) {
  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[300px] bg-slate-50 ${isVisible ? "block" : "hidden"}`}
    >
      {children}
    </div>
  );
}
