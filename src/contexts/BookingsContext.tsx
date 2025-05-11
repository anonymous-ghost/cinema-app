import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Booking, BookingStatus } from '../types/movie';

// Mock bookings data
const MOCK_BOOKINGS: Booking[] = [
  {
    id: "1",
    userId: "user1",
    sessionId: 1,
    seats: [{ row: 1, seat: 5 }, { row: 1, seat: 6 }],
    totalPrice: 240,
    bookingDate: "2023-06-15T14:30:00",
    status: BookingStatus.PAID,
    paymentId: "pay_1"
  },
  {
    id: "2",
    userId: "user2",
    sessionId: 3,
    seats: [{ row: 3, seat: 8 }],
    totalPrice: 120,
    bookingDate: "2023-06-16T10:15:00",
    status: BookingStatus.PAID,
    paymentId: "pay_2"
  },
  {
    id: "3",
    userId: "user1",
    sessionId: 5,
    seats: [{ row: 5, seat: 10 }, { row: 5, seat: 11 }, { row: 5, seat: 12 }],
    totalPrice: 360,
    bookingDate: "2023-06-18T18:45:00",
    status: BookingStatus.RESERVED
  }
];

// Interface for the context
interface BookingsContextType {
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  getUserBookings: (userId: string) => Booking[];
}

// Create the context
const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

// Provider component
export const BookingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);

  const addBooking = (booking: Booking) => {
    setBookings(prevBookings => [...prevBookings, booking]);
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId ? { ...booking, status } : booking
      )
    );
  };

  const getUserBookings = (userId: string) => {
    return bookings.filter(booking => booking.userId === userId);
  };

  return (
    <BookingsContext.Provider value={{ 
      bookings, 
      setBookings, 
      addBooking, 
      updateBookingStatus,
      getUserBookings
    }}>
      {children}
    </BookingsContext.Provider>
  );
};

// Custom hook to use the bookings context
export const useBookings = (): BookingsContextType => {
  const context = useContext(BookingsContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }
  return context;
}; 