import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Film } from '../types';
import { MOCK_FILMS } from '../Pages/AdminPanel';

// Interface for the context
interface FilmsContextType {
  films: Film[];
  setFilms: React.Dispatch<React.SetStateAction<Film[]>>;
}

// Create the context
const FilmsContext = createContext<FilmsContextType | undefined>(undefined);

// Provider component
export const FilmsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize films from localStorage if available, otherwise use MOCK_FILMS
  const [films, setFilms] = useState<Film[]>(() => {
    const savedFilms = localStorage.getItem('films');
    return savedFilms ? JSON.parse(savedFilms) : MOCK_FILMS;
  });

  // Save films to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('films', JSON.stringify(films));
  }, [films]);

  return (
    <FilmsContext.Provider value={{ films, setFilms }}>
      {children}
    </FilmsContext.Provider>
  );
};

// Custom hook to use the films context
export const useFilms = (): FilmsContextType => {
  const context = useContext(FilmsContext);
  if (context === undefined) {
    throw new Error('useFilms must be used within a FilmsProvider');
  }
  return context;
}; 