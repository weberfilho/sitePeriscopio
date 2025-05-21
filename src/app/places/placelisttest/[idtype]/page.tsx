// "use client";

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import Link from "next/link";
// import PlaceCard from "@/components/cards/PlaceCard";

// import { PlaceShortData } from "@/interfaces/place";
// import PopUp from "@/components/popup/Popup";
// import PopUpMessage from "@/components/popUpMessage/page";
// import createApiInstance from "@/api/api";
// import Menu from "@/components/orderMenu/Menu";
// import MenuTest from "@/components/orderMenuTest/MenuTest";
// import { useCityStorage } from "@/storage/city";

// interface Props {
//   params: { idtype: number };
// }

// var orderType = 1;

// const PlaceList = ({ params }: Props) => {
//   const [isPopUpVisible, setIsPopUpVisible] = useState(false);
//   const [places, setPlaces] = useState<PlaceShortData[]>([]);
//   const [placesByDistance, setPlacesByDistance] = useState<PlaceShortData[]>(
//     [],
//   );
//   // const [orderType, setOrderType] = useState(1);
//   const [showMenu, setShowMenu] = useState(false);
//   const cityId = useCityStorage().cityId;
//   const api = createApiInstance();

//   async function getPlaces() {
//     try {
//       const { data, status } = await api.get("testelocalenota", {
//         params: {
//           city_id: cityId,
//           category_id: params.idtype,
//         },
//       });
//       if (status === 200) {
//         setPlaces(data);
//         // console.log("Ordenacao por Destaque:", data);
//         if (data.length === 0) {
//           setIsPopUpVisible(true);
//         }
//       }
//     } catch (error) {
//       console.error("Erro getPlaces:", error);
//     } finally {
//     }
//   }

//   async function getPlacesByDistance() {
//     //-19.9251586558056, -43.946656104596414
//     try {
//       const { data, status } = await api.get("placebydistance", {
//         params: {
//           city_id: cityId,
//           category_id: params.idtype,
//           coordinates: { lat: -19.9251586558056, lng: -43.946656104596414 },
//         },
//       });
//       if (status === 200) {
//         setPlacesByDistance(data);
//         // console.log("placesByDistance", placesByDistance);
//         if (data.length === 0) {
//           setIsPopUpVisible(true);
//         }
//       }
//     } catch (error) {
//       console.error("Erro getPlacesByDistance:", error);
//     } finally {
//     }
//   }

//   function handleSort(sortType: number) {
//     if (sortType == 1) {
//       orderType = sortType;
//       setPlaces(
//         places.sort((a, b) => {
//           return a.priority - b.priority;
//         }),
//       );
//       // setOrderType(sortType);

//       console.log("Ordenacao por Destaques pos: ", places);
//       setShowMenu(false);
//     }
//     if (sortType == 2) {
//       orderType = sortType;
//       getPlacesByDistance();
//       console.log("Ordenacao por Mais proximos: ", places);
//       setShowMenu(false);
//       // setOrderType(sortType);
//     }
//     if (sortType == 3) {
//       orderType = sortType;
//       setPlaces(
//         places.sort((a, b) => {
//           return b.average - a.average;
//         }),
//       );
//       // setOrderType(sortType);
//       console.log("Ordenaçaõ por Melhor Avaliados: ", places);
//       setShowMenu(false);
//     }
//   }

//   useEffect(() => {
//     getPlaces();
//   }, [cityId]);

//   return (
//     <div className="flex flex-col items-center">
//       <input
//         type="text"
//         id="principal"
//         className="border-green w-fit border-spacing-4 rounded-full border-2 border-solid border-black px-6 py-3 shadow-md shadow-gray-500"
//         placeholder="Pesquisar nome do local"
//       />
//       <div className="mt-4 flex w-full flex-row justify-between">
//         <h1 className="ml-16 font-serif text-4xl font-bold italic">
//           {places[0]?.categorydata.name}
//         </h1>
//         <img
//           src="/order.ico"
//           className="mr-8 h-6 w-6 place-self-end border-2"
//           alt="imagem"
//           onClick={() => setShowMenu(!showMenu)}
//         />
//       </div>
//       {showMenu && <MenuTest sort={handleSort} />}
//       {orderType == 2 ? (
//         <ul className="mt-2">
//           {placesByDistance.map((place) => (
//             <li key={place.id} className="mx-2">
//               <Link href={`../../places/placeDetail/${place.id}`}>
//                 <PlaceCard
//                   name={place.name}
//                   neighborhood={place.adressdata.neighborhood}
//                   city={place.citydata.name}
//                   uf={place.citydata.state}
//                   urlImage={`https://x8ki-letl-twmt.n7.xano.io${place.urlimage}`}
//                 />
//               </Link>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <ul className="mt-2">
//           {places.map((place) => (
//             <li key={place.id} className="mx-2">
//               <Link href={`../../places/placeDetail/${place.id}`}>
//                 <PlaceCard
//                   name={place.name}
//                   neighborhood={place.adressdata.neighborhood}
//                   city={place.citydata.name}
//                   uf={place.citydata.state}
//                   urlImage={`https://x8ki-letl-twmt.n7.xano.io${place.urlimage}`}
//                 />
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}

//       {isPopUpVisible && (
//         <PopUp isVisible={isPopUpVisible}>
//           <PopUpMessage
//             text="Não existem estabelecimentos cadastrados nesta categoria"
//             action={() => setIsPopUpVisible(false)}
//           />
//         </PopUp>
//       )}
//     </div>
//   );
// };

// export default PlaceList;
