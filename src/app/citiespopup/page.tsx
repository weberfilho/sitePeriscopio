"use client";
import CitiesMenu from "@/components/citiesMenu/citiesMenu";
import PopUp from "@/components/popup/Popup";
import { truncate } from "fs";
import React from "react";

const citiesPopUp = () => {
  return (
    <div>
      <PopUp isVisible={true}>
        <CitiesMenu />
      </PopUp>
    </div>
  );
};

export default citiesPopUp;
