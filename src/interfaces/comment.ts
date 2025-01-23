interface Comment {
  id: number;
  created_at: Date;
  comment_text: string;
  score: number;
  user: {
    name: string;
  };
}

export default Comment;
