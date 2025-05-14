export interface Film {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  cast: string[];
  year: number;
  genres: string[];
  rating: number;
  originalRating?: number;
  trailerUrl?: string;
  isNew?: boolean;
  ageRating?: string;
  runtime?: string;
}

export interface Seat {
  row: number;
  seat: number;
}

export interface Session {
  id: string;
  filmId: string;
  date: string;
  time: string;
  price: number;
  hall: string;
  occupiedSeats: Seat[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
} 