export interface EventSuggestion {
  name: string;
  city: string;
  description: string;
  contact: string;
}
export interface EventShortData {
  id: number;
  name: string;
  local_name: string;
  start_date: Date | string;
}
export interface EventData {
  id: number;
  city_id: number;
  name: string;
  local_name: string;
  adress_id: 4;
  start_date: string | Date;
  end_date: string | Date;
  start_time: number;
  finish_time: number;
  description: string;
  url_ticket: string;
  priority: number;
  event_image: { path: string };
  url: string;
  adress: {
    id: number;
    street: string;
    number: number;
    neighborhood: string;
  };
  city: {
    id: number;
    name: string;
    state: string;
  };
}
