"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import PlaceCard from "@/components/cards/PlaceCard";
import * as zod from "zod";
import { PlaceShortData } from "@/interfaces/place";
import PopUp from "@/components/popup/Popup";
import PopUpMessage from "@/components/popUpMessage/page";
import createApiInstance from "@/api/api";

import MenuTest from "@/components/orderMenuTest/MenuTest";
import { useCityStorage } from "@/storage/city";

interface Props {
  params: { idtype: number };
}

var orderType = 1;

const PlaceList = ({ params }: Props) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [places, setPlaces] = useState<PlaceShortData[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<PlaceShortData[]>([]);
  const [placesByDistance, setPlacesByDistance] = useState<PlaceShortData[]>(
    [],
  );

  const [showMenu, setShowMenu] = useState(false);

  const cityId = useCityStorage().cityId;
  const api = createApiInstance();

  async function getPlaces() {
    try {
      const { data, status } = await api.get("testelocalenota", {
        params: {
          city_id: cityId,
          category_id: params.idtype,
        },
      });
      if (status === 200) {
        setPlaces(data);

        if (data.length === 0) {
          setIsPopUpVisible(true);
        }
      }
    } catch (error) {
      console.error("Erro getPlaces:", error);
    } finally {
    }
  }

  async function orderPlacesByDistance(lat: number, long: number) {
    try {
      const { data, status } = await api.get("placebydistance", {
        params: {
          city_id: cityId,
          category_id: params.idtype,
          coordinates: { lat: lat, lng: long },
        },
      });
      if (status === 200) {
        setPlacesByDistance(data);

        if (data.length === 0) {
          setIsPopUpVisible(true);
        }
      }
    } catch (error) {
      console.error("Erro getPlacesByDistance:", error);
    } finally {
    }
  }

  function handleSort(sortType: number) {
    if (sortType == 1) {
      orderType = sortType;
      setPlaces(
        places.sort((a, b) => {
          return a.priority - b.priority;
        }),
      );

      setShowMenu(false);
    }
    if (sortType == 2) {
      orderType = sortType;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            orderPlacesByDistance(latitude, longitude);
          },
          (err) => {
            // TODO: Handle geolocation error
          },
        );
      }

      setShowMenu(false);
    }
    if (sortType == 3) {
      orderType = sortType;
      setPlaces(
        places.sort((a, b) => {
          return b.average - a.average;
        }),
      );

      setShowMenu(false);
    }
  }

  useEffect(() => {
    getPlaces();
  }, [cityId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let searchTerm = event.target.value;
    if (searchTerm?.length >= 3) {
      setFilteredPlaces(
        places.filter((element) =>
          element.name.toLowerCase().startsWith(searchTerm.toLowerCase()),
        ),
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        onChange={handleChange}
        className="border-green w-fit border-spacing-4 rounded-full border-2 border-solid border-black px-6 py-3 shadow-md shadow-gray-500"
      />
      {showSuggestions && (
        <ul>
          {filteredPlaces.map((element) => (
            <Link href={`../../places/placeDetail/${element.id}`}>
              <li
                className="rounded-sm border-2 border-black px-2 hover:bg-red-400 focus:bg-yellow-500"
                key={element.id}
              >
                {element.name}
              </li>
            </Link>
          ))}
        </ul>
      )}

      <div className="flex w-full items-center justify-between p-4">
        <h1 className="mx-auto font-serif text-4xl font-bold italic">
          {places[0]?.categorydata.name}
        </h1>

        <img
          src="/faders.svg"
          className="h-6 w-6 cursor-pointer"
          alt="imagem"
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>
      {showMenu && <MenuTest sort={handleSort} />}
      {orderType == 2 ? (
        <ul className="mt-2">
          {placesByDistance.map((place) => (
            <li key={place.id} className="mx-2">
              <Link href={`../../places/placeDetail/${place.id}`}>
                <PlaceCard
                  name={place.name}
                  neighborhood={place.adressdata.neighborhood}
                  city={place.citydata.name}
                  uf={place.citydata.state}
                  urlImage={`https://x8ki-letl-twmt.n7.xano.io${place.urlimage}`}
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-2">
          {places.map((place) => (
            <li key={place.id} className="mx-2">
              <Link href={`../../places/placeDetail/${place.id}`}>
                <PlaceCard
                  name={place.name}
                  neighborhood={place.adressdata.neighborhood}
                  city={place.citydata.name}
                  uf={place.citydata.state}
                  urlImage={`https://x8ki-letl-twmt.n7.xano.io${place.urlimage}`}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {isPopUpVisible && (
        <PopUp isVisible={isPopUpVisible}>
          <PopUpMessage
            text="Não existem estabelecimentos cadastrados nesta categoria"
            action={() => setIsPopUpVisible(false)}
          />
        </PopUp>
      )}
    </div>
  );
};

export default PlaceList;
