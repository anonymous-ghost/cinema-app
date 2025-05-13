import React, { useState, useEffect } from "react";
import "../styles/Favorites.css";
import { Link } from 'react-router-dom';
import { useFavorites, FavoriteFilm } from "../contexts/FavoritesContext";
import { useAuth } from "../contexts/AuthContext";

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
  const { favoriteFilms, removeFromFavorites } = useFavorites();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Short timeout to prevent flash of loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle remove from favorites with event prevention
  const handleRemoveFromFavorites = (e: React.MouseEvent, filmId: string) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromFavorites(filmId);
  };

  if (isLoading) {
    return (
      <div className="loading-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading favorite films...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <main style={{ minHeight: "calc(100vh - 200px)" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="main-text" style={{ textAlign: "center", marginBottom: "30px" }}>
            <h1 className="text-netflix">FAVORITE FILMS</h1>
            <h3 className="text-current">Please log in to see your favorites</h3>
          </div>
          <div className="empty-favorites-wrapper" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
            <div className="empty-favorites" style={{ textAlign: "center" }}>
              <div className="empty-favorites-icon" style={{ fontSize: "48px", marginBottom: "20px" }}>🔐</div>
              <h2>Authentication Required</h2>
              <p>Please log in to view and manage your favorite films</p>
              <Link to="/" className="browse-movies-btn" style={{ display: "inline-block", marginTop: "20px" }}>Back to Home</Link>
            </div>
          </div>
        </div>
      </main>
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
                <div className="poster-container">
                  <img src={film.posterUrl} alt={film.title} />
                  <div className="heart-background">
                    <button
                      onClick={(e) => handleRemoveFromFavorites(e, film.id)}
                      className="toggle-heart liked"
                      id="toggle-heart"
                      aria-label="Remove from favorites"
                    >
                      ❤
                    </button>
                  </div>
                  {film.isNew && <div className="new-release-tag">NEW</div>}
                  <div className="date-added">{film.dateAdded}</div>
                </div>
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