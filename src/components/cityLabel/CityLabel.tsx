"use client";
import { useCityStorage } from "@/storage/city";
import React from "react";

const CityLabel = () => {
  const { cityName } = useCityStorage();

  return (
    <p className="text-lgf bold pb-2 font-sans font-semibold italic">
      {cityName}
    </p>
  );
};

export default CityLabel;
