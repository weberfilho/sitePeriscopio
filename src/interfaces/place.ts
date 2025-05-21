export interface PlaceShortData {
  id: number;
  name: string;
  priority: number;
  urlimage: string;
  average: number;
  adressdata: {
    id: number;
    street: string;
    number: number;
    neighborhood: string;
  };
  categorydata: {
    name: string;
  };
  citydata: {
    id: number;
    name: string;
    state: string;
  };
}

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

export interface PlaceSuggestion {
  name: string;
  city: string;
  description: string;
  contact: string;
}
