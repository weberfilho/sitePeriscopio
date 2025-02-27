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

export interface SentMessage {
  name: string;
}

export interface ChatData {
  id: number;
  userName: string;
  message: string;
  date: Date;
}

export interface ShortDataMessage {
  textmessage: string;
}
