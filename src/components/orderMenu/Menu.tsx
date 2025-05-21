import React, { useState } from "react";

type Props = {
  sort: (sortType: number) => void;
};

const Menu = ({ sort }: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="z-50 p-6">
      <img
        src="/order.ico"
        className="h-6 w-6 border-2"
        onClick={() => setShowMenu(!showMenu)}
        alt="imagem"
      />
      {showMenu && (
        <div>
          <ul>
            <li>Ordenar por:</li>
            <li onClick={() => sort(1)}>Mais Próximos</li>
            <li onClick={() => sort(2)}>Melhor Avaliados</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
