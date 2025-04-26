import { useState } from "react";

export default function FilmsCard() {
  const [like, setLike] = useState(true);

  function liked(e) {
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
      <img
        src="https://new.kinogo.fm/uploads/posts/2022-03/251733_1647372642.webp"
        alt=""
      />
      <img />
      <div className="films-info-card">
        <span className="film-name">Avatar</span>
        <div className="movie-rating">
          <span>&#9733;</span>
          <span>7.5</span>
        </div>
        <div className="film-category">
          <span className="name-category">Action</span>
          <span className="name-category">Adventure</span>
          <span className="name-category">Science Fiction</span>
        </div>
      </div>
    </a>
  );
}
