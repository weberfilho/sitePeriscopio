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
