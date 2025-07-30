"use client";

import createApiInstance from "@/api/api";
import api from "@/api/api";
import PopUp from "@/components/popup/Popup";
import PopUpMessage from "@/components/popUpMessage/page";

import React, { useEffect, useState } from "react";

interface Props {
  params: { idplace: number };
}

interface Picture {
  url: string;
}

const PlacePictures = ({ params }: Props) => {
  const [images, setImages] = useState<Picture[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [namePlace, setNamePlace] = useState<string>("");
  const api = createApiInstance();

  async function getPlacePictures() {
    try {
      const { data, status } = await api.get("placepictures", {
        params: {
          place_id: params.idplace,
        },
      });
      if (status === 200) {
        setImages(data.pictures);
        setNamePlace(data.place.name);
        console.log("Data", data);
        if (data.pictures.length === 0 || data === null) {
          setIsPopUpVisible(true);
        }
      }
    } catch (error) {
      console.error("Erro getPictures:", error);
      setIsPopUpVisible(true);
    } finally {
    }
  }

  useEffect(() => {
    getPlacePictures();
  }, []);

  console.log("Arrai:", images);

  const handleImageClick = (image: string) => {
    setSelectedImage(selectedImage === image ? null : image);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="p-4 text-center font-serif text-4xl font-bold italic">
        {namePlace}
      </h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative transform cursor-pointer transition ${
              selectedImage === image.url ? "z-10 scale-150" : ""
            }`}
            onClick={() => handleImageClick(image.url)}
          >
            <img
              src={image.url}
              alt={`Image ${index}`}
              width={300}
              height={300}
              className="rounded"
            />
          </div>
        ))}
      </div>
      {isPopUpVisible && (
        <PopUp isVisible={isPopUpVisible}>
          <PopUpMessage
            text="Não existem fotos cadastradas para este local"
            action={() => setIsPopUpVisible(false)}
          />
        </PopUp>
      )}
    </div>
  );
};

export default PlacePictures;
