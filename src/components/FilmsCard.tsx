import { useState, useEffect } from "react";
import { Film } from "../types";

interface FilmCardProps {
  film: Film;
}

const FilmsCard: React.FC<FilmCardProps> = ({ film }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  
  // Перевірка чи фільм у обраних при завантаженні компонента
  useEffect(() => {
    const checkIsFavorite = () => {
      try {
        const favoriteFilms = localStorage.getItem("favoriteFilms");
        if (favoriteFilms) {
          const favorites: Film[] = JSON.parse(favoriteFilms);
          const isFilmFavorite = favorites.some(favoriteFilm => favoriteFilm.id === film.id);
          setIsFavorite(isFilmFavorite);
        }
      } catch (error) {
        console.error("Помилка перевірки обраних:", error);
      }
    };
    
    checkIsFavorite();
  }, [film.id]);

  // Додавання або видалення фільму з обраних
  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
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
    } catch (error) {
      console.error("Помилка керування обраними:", error);
    }
  };

  return (
    <a href="#" className="films-card">
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
  );
};

export default FilmsCard;
