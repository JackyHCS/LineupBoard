export interface UserLineup {
  id: number;
  user_id: string;
  title: string;
  map: string;
  type: string;
  side: string;
  video_url: string;
  difficulty: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface UserLineupFormValues {
  title: string;
  map: string;
  type: string;
  side: string;
  video_url: string;
  difficulty: string;
  description: string;
}