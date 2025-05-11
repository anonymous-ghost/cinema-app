import React, { useState, useEffect } from "react";
import { Film } from "../types";
import "../styles/Favorites.css";
import { Link } from 'react-router-dom';
import { sortFilms } from "../utils/filmSort";

// Extending Film interface to include dateAdded
interface FavoriteFilm extends Film {
  dateAdded: string;
}

// Custom sort function for favorite films
const sortFavoriteFilms = (films: FavoriteFilm[]): FavoriteFilm[] => {
  return [...films].sort((a, b) => {
    // Сначала сортировка по isNew (новые фильмы первыми)
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;
    
    // Затем сортировка по году (новые фильмы первыми)
    return b.year - a.year;
  });
};

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
              const today = new Date();
              const formattedDate = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;
              return {
                ...film,
                dateAdded: `Added: ${formattedDate}` // Current date
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
      <div className="loading-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading favorite films...</p>
      </div>
    );
  }

  return (
    <main style={{ minHeight: "calc(100vh - 200px)" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="main-text" style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 className="text-netflix">FAVORITE FILMS</h1>
          <h3 className="text-current">Your Personal Collection</h3>
        </div>

        {favoriteFilms.length === 0 ? (
          <div className="empty-favorites-wrapper" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
            <div className="empty-favorites" style={{ textAlign: "center" }}>
              <div className="empty-favorites-icon" style={{ fontSize: "48px", marginBottom: "20px" }}>🎬</div>
              <h2>Your favorites list is empty</h2>
              <p>Add films to your favorites to find them here</p>
              <Link to="/" className="browse-movies-btn" style={{ display: "inline-block", marginTop: "20px" }}>Browse Films</Link>
            </div>
          </div>
        ) : (
          <div className="films" style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            justifyContent: "center",
            gap: "20px",
            marginBottom: "40px"
          }}>
            {sortFavoriteFilms(favoriteFilms).map((film) => (
              <Link to={`/movie/${film.id}`} className="films-card" key={film.id}>
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorites;