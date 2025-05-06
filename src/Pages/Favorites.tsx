import React, { useState, useEffect } from "react";
import { Film } from "../types";
import "../styles/Favorites.css";
import { Link } from 'react-router-dom';

interface FavoriteFilm extends Film {
  dateAdded?: string;
}

const Favorites: React.FC = () => {
  const [favoriteFilms, setFavoriteFilms] = useState<FavoriteFilm[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Loading favorite films from localStorage
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = localStorage.getItem("favoriteFilms");
        if (storedFavorites) {
          // Adding dateAdded if it doesn't exist
          const favorites: FavoriteFilm[] = JSON.parse(storedFavorites).map((film: Film) => {
            if (!('dateAdded' in film)) {
              return {
                ...film,
                dateAdded: 'Added: 05.06.2025' // Current date
              };
            }
            return film;
          });
          setFavoriteFilms(favorites);
        }
      } catch (error) {
        console.error("Error loading favorite films:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFavorites();
  }, []);

  // Remove film from favorites
  const removeFromFavorites = (e: React.MouseEvent, filmId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedFavorites = favoriteFilms.filter(film => film.id !== filmId);
    setFavoriteFilms(updatedFavorites);
    localStorage.setItem("favoriteFilms", JSON.stringify(updatedFavorites));
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading favorite films...</p>
      </div>
    );
  }

  return (
    <main>
      <div className="container">
        <div className="main-text">
          <h1 className="text-netflix">FAVORITE FILMS</h1>
          <h3 className="text-current">Your Personal Collection</h3>
        </div>

        {favoriteFilms.length === 0 ? (
          <div className="empty-favorites-wrapper">
            <div className="empty-favorites">
              <div className="empty-favorites-icon">🎬</div>
              <h2>Your favorites list is empty</h2>
              <p>Add films to your favorites to find them here</p>
              <Link to="/" className="browse-movies-btn">Browse Films</Link>
            </div>
          </div>
        ) : (
          <div className="films">
            {favoriteFilms.map((film) => (
              <a href="#" className="films-card" key={film.id}>
                <div className="heart-background">
                  <button
                    onClick={(e) => removeFromFavorites(e, film.id)}
                    className="toggle-heart liked"
                    id="toggle-heart"
                    aria-label="Remove from favorites"
                  >
                    ❤
                  </button>
                </div>
                <img src={film.posterUrl} alt={film.title} />
                <div className="date-added">{film.dateAdded}</div>
                <div className="films-info-card">
                  <span className="film-name">{film.title}</span>
                  <div className="movie-rating">
                    <span>&#9733;</span>
                    <span>{film.rating}</span>
                  </div>
                  <div className="film-category">
                    {film.genres.slice(0, 3).map((genre, index) => (
                      <span key={index} className="name-category">{genre}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorites;