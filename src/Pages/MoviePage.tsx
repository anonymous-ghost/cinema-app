import { useParams } from "react-router-dom";
import { Breadcrumb } from "@/components/ui/MovieBreadcrumb";
import MovieDetails from "@/components/movie/MovieDetails";
import MovieTabs from "@/components/movie/MovieTabs";
import MovieSidebar from "@/components/movie/MovieSidebar";
import { useFilms } from "../contexts/FilmsContext";
import { useSessions } from "../contexts/SessionsContext";
import { Film } from "../types";
import { sortFilms } from "../utils/filmSort";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const { films } = useFilms();
  const { sessions } = useSessions();
  
  // Find the current movie
  const movie = films.find(film => film.id === id);
  
  // Get sessions for this movie
  const movieSessions = sessions.filter(session => session.filmId === id);
  
  // Get recommendations (other movies), sorted with new films first
  const recommendations = sortFilms(
    films.filter(film => film.id !== id)
  ).slice(0, 4);

  if (!movie) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-[#2D2D2D] rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="w-full md:w-64 h-96 bg-[#2D2D2D] rounded-lg"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-[#2D2D2D] rounded w-1/2"></div>
                  <div className="h-4 bg-[#2D2D2D] rounded w-1/4"></div>
                  <div className="h-4 bg-[#2D2D2D] rounded w-3/4"></div>
                  <div className="h-4 bg-[#2D2D2D] rounded w-1/2"></div>
                  <div className="h-4 bg-[#2D2D2D] rounded w-5/6"></div>
                  <div className="h-32 bg-[#2D2D2D] rounded w-full"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-4 bg-[#2D2D2D] rounded w-1/2 mb-4"></div>
              <div className="grid grid-cols-2 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-[#2D2D2D] rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Map our Film type to the expected Movie type for components
  const mappedMovie = {
    id: parseInt(movie.id),
    title: movie.title,
    description: movie.description,
    posterUrl: movie.posterUrl,
    trailerUrl: movie.trailerUrl || "",
    ageRating: movie.ageRating || "13+",
    rating: movie.rating,
    releaseYear: movie.year,
    runtime: "2 hrs", // Default value
    genres: movie.genres,
    cast: movie.cast
  };

  // Map our sessions to the expected format
  const mappedSessions = movieSessions.map(session => ({
    id: parseInt(session.id),
    movieId: parseInt(session.filmId),
    date: session.date,
    time: session.time,
    occupiedSeats: [] // Default value
  }));

  // Map recommendations
  const mappedRecommendations = recommendations.map(film => ({
    id: parseInt(film.id),
    title: film.title,
    description: film.description,
    posterUrl: film.posterUrl,
    trailerUrl: film.trailerUrl || "",
    ageRating: film.ageRating || "13+",
    rating: film.rating,
    releaseYear: film.year,
    runtime: "2 hrs", // Default value
    genres: film.genres,
    cast: film.cast
  }));

  return (
    <div className="container mx-auto px-6 py-8">
      <Breadcrumb
        items={[
          { label: "Main page", href: "/" },
          { label: mappedMovie.title }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <MovieDetails movie={mappedMovie} />
          <MovieTabs movie={mappedMovie} sessions={mappedSessions} />
        </div>
        
        <div className="lg:col-span-1">
          <MovieSidebar 
            recommendations={mappedRecommendations}
            adImageUrl="https://i.imgur.com/ljfaW3J.png"
          />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
