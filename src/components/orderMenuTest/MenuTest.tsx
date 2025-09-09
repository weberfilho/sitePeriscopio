import React, { useState } from "react";

type Props = {
  sort: (sortType: number) => void;
};

const MenuTest = ({ sort }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex w-full flex-row items-end justify-end">
      <div className="mx-2 w-fit">
        <ul className="w-fit">
          <li className="w-fit font-bold" onClick={() => sort(1)}>
            Ordenar por:
          </li>
          <li
            className="rounded-sm border-2 border-black px-2 hover:bg-red-400 focus:bg-yellow-500"
            onClick={() => sort(1)}
          >
            Destaques
          </li>
          <li
            className="rounded-sm border-2 border-black px-2 hover:bg-red-400 focus:bg-yellow-500"
            onClick={() => sort(2)}
          >
            Mais Próximos
          </li>
          <li
            className="rounded-sm border-2 border-black px-2 hover:bg-red-400 focus:bg-yellow-500"
            onClick={() => sort(3)}
          >
            Melhor Avaliados
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuTest;
