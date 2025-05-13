import { Link } from "react-router-dom";
import { Movie } from "@/types/movie";

interface RecommendationCardProps {
  movie: Movie;
}

const RecommendationCard = ({ movie }: RecommendationCardProps) => (
  <Link to={`/movie/${movie.id}`} className="block group">
    <div className="aspect-[2/3] relative overflow-hidden">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-full object-cover transition duration-200 rounded-sm"
      />
      <div className="absolute inset-0 rounded-[0.4rem] bg-blackish/95 opacity-0 group-hover:opacity-100 transition duration-200 flex flex-col items-center justify-center">
        <span className="text-white text-base font-bold text-center px-2">
          {movie.title}
        </span>
        <span className="movie-description text-sm font-normal text-center px-2">
          {movie.releaseYear + " • " + movie.ageRating}
        </span>
      </div>
    </div>
  </Link>
);

export default RecommendationCard;