import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Session } from '../types';

// Оновлений список сеансів - по 2 сеанси для кожного фільму з різними датами
const MOCK_SESSIONS: Session[] = [
  // Фільм 1
  { id: "1", filmId: "1", date: "2025-04-20", time: "10:00", price: 100, hall: "Hall 1", occupiedSeats: [] },
  { id: "2", filmId: "1", date: "2025-04-25", time: "15:30", price: 120, hall: "IMAX", occupiedSeats: [] },
  
  // Фільм 2
  { id: "3", filmId: "2", date: "2025-04-21", time: "11:00", price: 100, hall: "Hall 3", occupiedSeats: [] },
  { id: "4", filmId: "2", date: "2025-04-26", time: "16:30", price: 120, hall: "Hall 1", occupiedSeats: [] },
  
  // Фільм 3
  { id: "5", filmId: "3", date: "2025-04-22", time: "10:30", price: 100, hall: "Hall 4", occupiedSeats: [] },
  { id: "6", filmId: "3", date: "2025-04-27", time: "14:00", price: 120, hall: "Hall 2", occupiedSeats: [] },
  
  // Фільм 4
  { id: "7", filmId: "4", date: "2025-04-23", time: "12:00", price: 100, hall: "Hall 1", occupiedSeats: [] },
  { id: "8", filmId: "4", date: "2025-04-28", time: "17:00", price: 120, hall: "Hall 3", occupiedSeats: [] },
  
  // Фільм 5
  { id: "9", filmId: "5", date: "2025-04-24", time: "11:30", price: 100, hall: "Hall 2", occupiedSeats: [] },
  { id: "10", filmId: "5", date: "2025-04-29", time: "15:00", price: 120, hall: "Hall 4", occupiedSeats: [] },
  
  // Фільм 6
  { id: "11", filmId: "6", date: "2025-04-25", time: "10:00", price: 100, hall: "Hall 3", occupiedSeats: [] },
  { id: "12", filmId: "6", date: "2025-04-30", time: "14:30", price: 120, hall: "IMAX", occupiedSeats: [] },
  
  // Фільм 7
  { id: "13", filmId: "7", date: "2025-04-26", time: "11:00", price: 100, hall: "Hall 4", occupiedSeats: [] },
  { id: "14", filmId: "7", date: "2025-05-01", time: "16:00", price: 120, hall: "Hall 1", occupiedSeats: [] },
  
  // Фільм 8
  { id: "15", filmId: "8", date: "2025-04-27", time: "10:30", price: 100, hall: "Hall 2", occupiedSeats: [] },
  { id: "16", filmId: "8", date: "2025-05-02", time: "15:30", price: 120, hall: "Hall 3", occupiedSeats: [] },
  
  // Фільм 9
  { id: "17", filmId: "9", date: "2025-04-28", time: "12:00", price: 100, hall: "Hall 4", occupiedSeats: [] },
  { id: "18", filmId: "9", date: "2025-05-03", time: "16:30", price: 120, hall: "IMAX", occupiedSeats: [] },
  
  // Фільм 10
  { id: "19", filmId: "10", date: "2025-04-29", time: "11:30", price: 100, hall: "Hall 3", occupiedSeats: [] },
  { id: "20", filmId: "10", date: "2025-05-04", time: "15:00", price: 120, hall: "Hall 1", occupiedSeats: [] },
  
  // Фільм 11
  { id: "21", filmId: "11", date: "2025-04-30", time: "10:00", price: 100, hall: "Hall 2", occupiedSeats: [] },
  { id: "22", filmId: "11", date: "2025-05-05", time: "14:30", price: 120, hall: "Hall 4", occupiedSeats: [] },
  
  // Фільм 12
  { id: "23", filmId: "12", date: "2025-05-01", time: "11:00", price: 100, hall: "Hall 3", occupiedSeats: [] },
  { id: "24", filmId: "12", date: "2025-05-06", time: "16:00", price: 120, hall: "IMAX", occupiedSeats: [] }
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
  // Initialize sessions from localStorage or use mock data
  const [sessions, setSessions] = useState<Session[]>(() => {
    const savedSessions = localStorage.getItem('sessions');
    return savedSessions ? JSON.parse(savedSessions) : MOCK_SESSIONS;
  });

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sessions', JSON.stringify(sessions));
  }, [sessions]);
  
  // Listen for storage events to sync sessions across components and tabs
  useEffect(() => {
    // This function will be called when localStorage changes in any tab/window
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'sessions' && event.newValue) {
        try {
          const updatedSessions = JSON.parse(event.newValue);
          setSessions(updatedSessions);
        } catch (error) {
          console.error('Error parsing sessions from localStorage:', error);
        }
      }
    };

    // Add event listener
    window.addEventListener('storage', handleStorageChange);
    
    // Also check for direct localStorage changes in the same window
    const checkLocalStorage = () => {
      const storedSessions = localStorage.getItem('sessions');
      if (storedSessions) {
        try {
          const parsedSessions = JSON.parse(storedSessions);
          // Only update if different to avoid infinite loops
          if (JSON.stringify(parsedSessions) !== JSON.stringify(sessions)) {
            setSessions(parsedSessions);
          }
        } catch (error) {
          console.error('Error parsing sessions from localStorage:', error);
        }
      }
    };
    
    // Check every 2 seconds for changes
    const interval = setInterval(checkLocalStorage, 2000);
    
    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [sessions]);

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