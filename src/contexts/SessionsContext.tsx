import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Session } from '../types';

// Оновлений список сеансів - по 2 сеанси для кожного фільму з різними датами
const MOCK_SESSIONS: Session[] = [
  // Фільм 1
  { id: "1", filmId: "1", date: "2025-04-20", time: "10:00", price: 100, hall: "Hall 1" },
  { id: "2", filmId: "1", date: "2025-04-25", time: "15:30", price: 120, hall: "IMAX" },
  
  // Фільм 2
  { id: "3", filmId: "2", date: "2025-04-21", time: "11:00", price: 100, hall: "Hall 3" },
  { id: "4", filmId: "2", date: "2025-04-26", time: "16:30", price: 120, hall: "Hall 1" },
  
  // Фільм 3
  { id: "5", filmId: "3", date: "2025-04-22", time: "10:30", price: 100, hall: "Hall 4" },
  { id: "6", filmId: "3", date: "2025-04-27", time: "14:00", price: 120, hall: "Hall 2" },
  
  // Фільм 4
  { id: "7", filmId: "4", date: "2025-04-23", time: "12:00", price: 100, hall: "Hall 1" },
  { id: "8", filmId: "4", date: "2025-04-28", time: "17:00", price: 120, hall: "Hall 3" },
  
  // Фільм 5
  { id: "9", filmId: "5", date: "2025-04-24", time: "11:30", price: 100, hall: "Hall 2" },
  { id: "10", filmId: "5", date: "2025-04-29", time: "15:00", price: 120, hall: "Hall 4" },
  
  // Фільм 6
  { id: "11", filmId: "6", date: "2025-04-25", time: "10:00", price: 100, hall: "Hall 3" },
  { id: "12", filmId: "6", date: "2025-04-30", time: "14:30", price: 120, hall: "IMAX" },
  
  // Фільм 7
  { id: "13", filmId: "7", date: "2025-04-26", time: "11:00", price: 100, hall: "Hall 4" },
  { id: "14", filmId: "7", date: "2025-05-01", time: "16:00", price: 120, hall: "Hall 1" },
  
  // Фільм 8
  { id: "15", filmId: "8", date: "2025-04-27", time: "10:30", price: 100, hall: "Hall 2" },
  { id: "16", filmId: "8", date: "2025-05-02", time: "15:30", price: 120, hall: "Hall 3" },
  
  // Фільм 9
  { id: "17", filmId: "9", date: "2025-04-28", time: "12:00", price: 100, hall: "Hall 4" },
  { id: "18", filmId: "9", date: "2025-05-03", time: "16:30", price: 120, hall: "IMAX" },
  
  // Фільм 10
  { id: "19", filmId: "10", date: "2025-04-29", time: "11:30", price: 100, hall: "Hall 3" },
  { id: "20", filmId: "10", date: "2025-05-04", time: "15:00", price: 120, hall: "Hall 1" },
  
  // Фільм 11
  { id: "21", filmId: "11", date: "2025-04-30", time: "10:00", price: 100, hall: "Hall 2" },
  { id: "22", filmId: "11", date: "2025-05-05", time: "14:30", price: 120, hall: "Hall 4" },
  
  // Фільм 12
  { id: "23", filmId: "12", date: "2025-05-01", time: "11:00", price: 100, hall: "Hall 3" },
  { id: "24", filmId: "12", date: "2025-05-06", time: "16:00", price: 120, hall: "IMAX" }
];

// Interface for the context
interface SessionsContextType {
  sessions: Session[];
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
}

// Create the context
const SessionsContext = createContext<SessionsContextType | undefined>(undefined);

// Provider component
export const SessionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);

  return (
    <SessionsContext.Provider value={{ sessions, setSessions }}>
      {children}
    </SessionsContext.Provider>
  );
};

// Custom hook to use the sessions context
export const useSessions = (): SessionsContextType => {
  const context = useContext(SessionsContext);
  if (context === undefined) {
    throw new Error('useSessions must be used within a SessionsProvider');
  }
  return context;
}; 