import React, { createContext, useState, useContext, ReactNode } from 'react';
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
  const [films, setFilms] = useState<Film[]>(MOCK_FILMS);

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