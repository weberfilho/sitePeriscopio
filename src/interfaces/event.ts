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
