import React from 'react';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../contexts/AuthContext';

const ClearStorage: React.FC = () => {
  const { toast } = useToast();
  const { logout } = useAuth();

  const handleClearStorage = () => {
    try {
      // Get the current user ID if available
      const currentUser = localStorage.getItem('currentUser');
      const userId = currentUser ? JSON.parse(currentUser).id : null;
      
      // Clear all movie-related localStorage items
      localStorage.removeItem('films');
      localStorage.removeItem('sessions');
      localStorage.removeItem('favorites');
      localStorage.removeItem('favoriteFilms');
      localStorage.removeItem('bookings');
      
      // Clear search parameters
      localStorage.removeItem('searchTitle');
      localStorage.removeItem('selectedGenre');
      localStorage.removeItem('selectedYear');
      localStorage.removeItem('selectedRating');
      localStorage.removeItem('currentPage');
      
      // Clear user-specific favorites if a user is logged in
      if (userId) {
        localStorage.removeItem(`favorites_${userId}`);
      }
      
      // Clear any movie reviews
      const allKeys = Object.keys(localStorage);
      for (const key of allKeys) {
        if (key.startsWith('movie_reviews_')) {
          localStorage.removeItem(key);
        }
      }
      
      // Display success message first
      toast({
        title: "Cache cleared",
        description: "All local storage data successfully cleared. You will be logged out.",
      });
      
      // Log out the user
      logout();
      
      // Force a complete page reload to ensure all content is refreshed
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      console.error("Error clearing storage:", error);
      toast({
        title: "Error",
        description: "Failed to clear local storage",
        variant: "destructive"
      });
    }
  };

  return (
    <button 
      onClick={handleClearStorage}
      className="admin-btn admin-btn-secondary"
      style={{
        padding: '8px 16px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px'
      }}
    >
      Clear Cache
    </button>
  );
};

export default ClearStorage;
