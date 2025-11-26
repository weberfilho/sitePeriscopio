export interface ReceiveidMessage {
  id: number;
  created_at: Date;
  user_id: number;
  text: string;
  event_id: string;
  user: {
    name: string;
  };
  event: {
    name: string;
  };
}

export interface ShortDataMessage {
  textmessage: string;
}

export interface ChatData {
  id: number;
  date: Date;
  userName: string;
  message: string;
}
