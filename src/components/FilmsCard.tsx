import { useState, useEffect } from "react";
import { Film } from "../types";

interface FilmsCardProps {
  film?: Film;
}

const FilmsCard: React.FC<FilmsCardProps> = ({ film }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  
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
      console.error("Error managing favorites:", error);
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
      {film ? (
        <>
          <img src={film.posterUrl} alt={film.title} />
          {film.isNew && <div className="new-release-tag">NEW</div>}
        </>
      ) : (
        <img
          src="https://new.kinogo.fm/uploads/posts/2022-03/251733_1647372642.webp"
          alt="Default poster"
        />
      )}
      <div className="films-info-card">
        <span className="film-name">
          {film ? film.title : "Avatar"}
        </span>
        <div className="movie-rating">
          <span>&#9733;</span>
          <span>{film ? film.rating : "7.5"}</span>
        </div>
        <div className="film-category">
          {film ? (
            film.genres.slice(0, 3).map((genre, index) => (
              <span key={index} className="name-category">{genre}</span>
            ))
          ) : (
            <>
              <span className="name-category">Action</span>
              <span className="name-category">Adventure</span>
              <span className="name-category">Science Fiction</span>
            </>
          )}
        </div>
      </div>
    </a>
  );
};

export default FilmsCard;
