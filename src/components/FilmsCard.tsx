import { useState, useEffect } from "react";
import { Film } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/useToast";

interface FilmsCardProps {
  film?: Film;
}

const FilmsCard: React.FC<FilmsCardProps> = ({ film }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Перевірка чи фільм у обраних при завантаженні компонента
  useEffect(() => {
    if (!film) return; // Вихід, якщо фільм не передано
    
    const checkIsFavorite = () => {
      try {
        const favoriteFilms = localStorage.getItem("favoriteFilms");
        if (favoriteFilms) {
          const favorites: Film[] = JSON.parse(favoriteFilms);
          const isFilmFavorite = favorites.some(favoriteFilm => favoriteFilm.id === film.id);
          setIsFavorite(isFilmFavorite);
        }
      } catch (error) {
        console.error("Error checking favorites:", error);
      }
    };
    
    checkIsFavorite();
  }, [film?.id]);

  // Додавання або видалення фільму з обраних
  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!film) return; // Вихід, якщо фільм не передано
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({ 
        title: "Authentication required", 
        description: "Please login to add movies to favorites", 
        variant: "destructive" 
      });
      
      // Optionally navigate to login page
      // navigate('/login');
      return;
    }
    
    try {
      // Отримуємо поточний список обраних
      const favoriteFilmsString = localStorage.getItem("favoriteFilms");
      let favoriteFilms: Film[] = favoriteFilmsString ? JSON.parse(favoriteFilmsString) : [];
      
      if (isFavorite) {
        // Видаляємо з обраних
        favoriteFilms = favoriteFilms.filter(favoriteFilm => favoriteFilm.id !== film.id);
      } else {
        // Додаємо до обраних
        favoriteFilms.push(film);
      }
      
      // Зберігаємо оновлений список обраних
      localStorage.setItem("favoriteFilms", JSON.stringify(favoriteFilms));
      setIsFavorite(!isFavorite);
      
      // Show success message
      if (!isFavorite) {
        toast({ 
          title: "Added to favorites", 
          description: `${film.title} has been added to your favorites`
        });
      } else {
        toast({ 
          title: "Removed from favorites", 
          description: `${film.title} has been removed from your favorites`
        });
      }
    } catch (error) {
      console.error("Error managing favorites:", error);
    }
  };

  if (!film) {
    return null; // Don't render anything if no film is provided
  }

  return (
    <Link to={`/movie/${film.id}`} className="films-card">
      <div className="heart-background">
        <button
          onClick={toggleFavorite}
          className={isFavorite ? "toggle-heart liked" : "toggle-heart"}
          id="toggle-heart"
          aria-label="like"
        >
          ❤
        </button>
      </div>
      <img src={film.posterUrl} alt={film.title} />
      {film.isNew && <div className="new-release-tag">NEW</div>}
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
  );
};

export default FilmsCard;
