// export interface PlaceData {
//   id: number;
//   name: string;
//   category_name: string;
//   niver_promo: string;
//   description: string;
//   url_menu: string;
//   url_juckebox: string;
//   url_contact: string;
//   priority: number;
//   url_image: string;
//   url_schedule: string;
//   street: string;
//   adress_number: number;
//   city_name: string;
//   city_state: string;
//   neighborhood: string;
//   fotos: [];
// }

export interface PlaceData {
  id: number;
  category_id: number;
  name: string;
  adress_id: number;
  description: string;
  url_menu: string;
  url_juckebox: string;
  url_contact: string;
  niver_promo: string;
  url_schedule: string;
  priority: number;
  image_place: { path: string };
  city: {
    id: number;
    name: string;
    state: string;
  };
  category: {
    name: string;
  };
  adress: {
    id: number;
    street: string;
    number: number;
    neighborhood: string;
  };
}
