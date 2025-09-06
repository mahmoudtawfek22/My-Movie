export interface Person {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  media_type: 'person';
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string | null;
}
