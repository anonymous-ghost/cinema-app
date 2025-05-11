import { useState } from "react";

interface FilmsCardProps {
  title?: string;
  rating?: number;
  image?: string;
  categories?: string[];
}

const FilmsCard = ({ 
  title = "Avatar", 
  rating = 7.5, 
  image = "https://new.kinogo.fm/uploads/posts/2022-03/251733_1647372642.webp",
  categories = ["Action", "Adventure", "Science Fiction"]
}: FilmsCardProps) => {
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
      <img
        src={image}
        alt={title}
      />
      <div className="films-info-card">
        <span className="film-name">{title}</span>
        <div className="movie-rating">
          <span>&#9733;</span>
          <span>{rating}</span>
        </div>
        <div className="film-category">
          {categories.map((category, index) => (
            <span key={index} className="name-category">{category}</span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default FilmsCard;
