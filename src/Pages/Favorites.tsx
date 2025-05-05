import React, { useState, useEffect } from "react";
import { Film } from "../types";
import "../styles/Favorites.css";
import { Link } from 'react-router-dom';

const Favorites: React.FC = () => {
  const [favoriteFilms, setFavoriteFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Завантаження обраних фільмів з localStorage
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = localStorage.getItem("favoriteFilms");
        if (storedFavorites) {
          setFavoriteFilms(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Помилка завантаження обраних фільмів:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFavorites();
  }, []);

  // Видалення фільму зі списку обраних
  const removeFromFavorites = (filmId: string) => {
    const updatedFavorites = favoriteFilms.filter(film => film.id !== filmId);
    setFavoriteFilms(updatedFavorites);
    localStorage.setItem("favoriteFilms", JSON.stringify(updatedFavorites));
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Завантаження обраних фільмів...</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1 className="text-netflix">ОБРАНІ ФІЛЬМИ</h1>
        <p className="favorites-subtitle">Ваша особиста колекція улюблених фільмів</p>
      </div>

      {favoriteFilms.length === 0 ? (
        <div className="empty-favorites">
          <div className="empty-favorites-icon">🎬</div>
          <h2>Список обраних порожній</h2>
          <p>Додайте фільми до обраних, щоб знайти їх тут</p>
          <Link to="/" className="browse-movies-btn">Переглянути фільми</Link>
        </div>
      ) : (
        <div className="favorites-films">
          {favoriteFilms.map((film) => (
            <div className="favorite-film-card" key={film.id}>
              <div className="favorite-poster-container">
                <img src={film.posterUrl} alt={film.title} className="favorite-poster" />
                <button 
                  className="remove-favorite-btn" 
                  onClick={() => removeFromFavorites(film.id)}
                  aria-label="Видалити з обраних"
                >
                  ✕
                </button>
              </div>
              <div className="favorite-film-info">
                <h3 className="favorite-film-title">{film.title}</h3>
                <div className="favorite-film-rating">
                  <span className="star-icon">★</span>
                  <span>{film.rating}</span>
                </div>
                <div className="favorite-film-genres">
                  {film.genres.map((genre, index) => (
                    <span key={index} className="favorite-film-genre">{genre}</span>
                  ))}
                </div>
                <p className="favorite-film-year">{film.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;