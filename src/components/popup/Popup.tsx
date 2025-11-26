import React, { ReactNode } from "react";

type Props = {
  isVisible?: boolean;
  children: ReactNode;
};

export default function PopUp({ isVisible = true, children }: Props) {
  return (
    <div
      className={`pointer-events-auto fixed inset-0 z-40 bg-black/50 ${isVisible ? "block" : "hidden"}`}
    >
      {children}
    </div>
  );
}
