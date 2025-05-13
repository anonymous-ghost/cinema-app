import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Film } from '../types';
import { useAuth } from './AuthContext';

// Extending Film interface to include dateAdded
export interface FavoriteFilm extends Film {
  dateAdded: string;
}

// Interface for the context
interface FavoritesContextType {
  favoriteFilms: FavoriteFilm[];
  addToFavorites: (film: Film) => void;
  removeFromFavorites: (filmId: string) => void;
  isFavorite: (filmId: string) => boolean;
}

// Create the context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Provider component
export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoriteFilms, setFavoriteFilms] = useState<FavoriteFilm[]>([]);
  const { currentUser, isAuthenticated } = useAuth();

  // Load favorites when user authentication state changes
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      loadUserFavorites(currentUser.id);
    } else {
      // Clear favorites when logged out
      setFavoriteFilms([]);
      localStorage.removeItem('favoriteFilms');
    }
  }, [isAuthenticated, currentUser]);

  // Load user favorites from localStorage
  const loadUserFavorites = (userId: string) => {
    try {
      const userFavoritesKey = `favorites_${userId}`;
      const storedFavorites = localStorage.getItem(userFavoritesKey);
      
      if (storedFavorites) {
        const favorites: FavoriteFilm[] = JSON.parse(storedFavorites);
        setFavoriteFilms(favorites);
        
        // Also set to regular favoriteFilms for backward compatibility
        localStorage.setItem('favoriteFilms', storedFavorites);
      } else {
        // Check if there are any favorites in the old format
        const oldFavorites = localStorage.getItem('favoriteFilms');
        if (oldFavorites && isAuthenticated) {
          // Migrate old favorites to the new user-specific format
          localStorage.setItem(`favorites_${userId}`, oldFavorites);
          setFavoriteFilms(JSON.parse(oldFavorites));
        } else {
          setFavoriteFilms([]);
        }
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavoriteFilms([]);
    }
  };

  // Save favorites to localStorage
  const saveFavorites = (updatedFavorites: FavoriteFilm[]) => {
    try {
      if (isAuthenticated && currentUser) {
        const userFavoritesKey = `favorites_${currentUser.id}`;
        localStorage.setItem(userFavoritesKey, JSON.stringify(updatedFavorites));
      }
      
      // Also update the regular favoriteFilms for backward compatibility
      localStorage.setItem('favoriteFilms', JSON.stringify(updatedFavorites));
      setFavoriteFilms(updatedFavorites);
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  // Add film to favorites
  const addToFavorites = (film: Film) => {
    if (!isAuthenticated) return;

    try {
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;
      
      const favoriteFilm: FavoriteFilm = {
        ...film,
        dateAdded: `Added: ${formattedDate}`
      };
      
      const updatedFavorites = [...favoriteFilms, favoriteFilm];
      saveFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  // Remove film from favorites
  const removeFromFavorites = (filmId: string) => {
    if (!isAuthenticated) return;
    
    try {
      const updatedFavorites = favoriteFilms.filter(film => film.id !== filmId);
      saveFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  // Check if film is in favorites
  const isFavorite = (filmId: string): boolean => {
    return favoriteFilms.some(film => film.id === filmId);
  };

  return (
    <FavoritesContext.Provider value={{ 
      favoriteFilms,
      addToFavorites,
      removeFromFavorites,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the favorites context
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 