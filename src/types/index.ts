export interface Film {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  cast: string[];
  year: number;
  genres: string[];
  rating: number;
  trailerUrl?: string;
  isNew?: boolean;
}

export interface Session {
  id: string;
  filmId: string;
  date: string;
  time: string;
  price: number;
  hall: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
} 