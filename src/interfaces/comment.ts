export interface Comment {
  id: number;
  created_at: Date;
  comment_text: string;
  score: number;
  user: {
    name: string;
  };
  place: {
    name: string;
  };
}

export interface SentComment {
  user_id: number;
  comment_text: string;
  place_id: number;
  score: number;
}

export interface ShortDataComment {
  assessment: string;
}

export interface CommentCardData {
  id: number;
  userName: string;
  commentText: string;
  rating: number;
  date: string | Date;
}
