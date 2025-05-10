export interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  trailerUrl: string;
  ageRating: string;
  rating: number;
  genres: string[];
  releaseYear: number;
  runtime: string;
  cast: string[];
}

export interface Seat {
  row: number;
  seat: number;
}

export interface Session {
  id: number;
  movieId: number;
  date: string;
  time: string;
  occupiedSeats: Seat[];
}

export interface ExtendedSeat extends Seat {
  seatNumber: number;
}