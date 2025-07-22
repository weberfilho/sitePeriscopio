import React, { ReactNode } from "react";

type Props = {
  isVisible?: boolean;
  children: ReactNode;
};

// const SCREEN_WIDTH = window.innerWidth;
// const SCREEN_HEIGHT = window.innerHeight;

export default function PopUp({ isVisible = true, children }: Props) {
  return (
    <div
      className={`fixed inset-0 bg-black/50 z-40 pointer-events-auto ${isVisible ? "block" : "hidden"}`}
    >
      {children}
    </div>
  );
}
// `//fixed left-1/2 top-1/2 h-fit w-[360px] -translate-x-1/2 -translate-y-1/2 bg-slate-50