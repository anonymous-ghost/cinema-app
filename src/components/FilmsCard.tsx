import { useState } from "react";
import { Film } from "../types";

interface FilmsCardProps {
  film?: Film;
}

const FilmsCard = ({ film }: FilmsCardProps) => {
  const [like, setLike] = useState<boolean>(true);

  function liked(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLike(!like);
  }
  return (
    <a href="#" className="films-card">
      <div className="heart-background">
        <button
          onClick={liked}
          className={like ? "toggle-heart" : "toggle-heart liked"}
          id="toggle-heart"
          aria-label="like"
        >
          ❤
        </button>
      </div>
      {film ? (
        <>
          <img
            src={film.posterUrl}
            alt={film.title}
          />
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
