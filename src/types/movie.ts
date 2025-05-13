export interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  trailerUrl: string;
  ageRating: string;
  rating: number;
  originalRating?: number;
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

// New interfaces for booking system
export interface Booking {
  id: string;
  userId: string;
  sessionId: string;
  seats: Seat[];
  totalPrice: number;
  bookingDate: string;
  status: BookingStatus;
  paymentId?: string;
}

export enum BookingStatus {
  RESERVED = 'reserved',
  PAID = 'paid',
  CANCELLED = 'cancelled'
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
  APPLE_PAY = 'apple_pay',
  GOOGLE_PAY = 'google_pay'
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export interface Review {
  id: string;
  movieId: number;
  author: string;
  text: string;
  rating: number; // 1-10 rating
  createdAt: string; // ISO date string
  userId?: string; // Optional for backward compatibility with existing reviews
}

// Interface for review data when submitting a new review or editing
export interface ReviewSubmitData {
  movieId: number;
  author: string;
  text: string;
  rating: number;
  userId?: string;
}