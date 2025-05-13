import { useParams } from "react-router-dom";
import { Breadcrumb } from "@/components/ui/MovieBreadcrumb";
import MovieDetails from "@/components/movie/MovieDetails";
import MovieTabs from "@/components/movie/MovieTabs";
import MovieSidebar from "@/components/movie/MovieSidebar";
import { useFilms } from "../contexts/FilmsContext";
import { useSessions } from "../contexts/SessionsContext";
import { Movie } from "@/types/movie";
import { useState, useEffect } from "react";

// Helper function to get random items from an array
const getRandomItems = (array: any[], count: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const { films, setFilms } = useFilms();
  const { sessions } = useSessions();
  const [mappedMovie, setMappedMovie] = useState<Movie | null>(null);
  
  // Find the current movie
  const movie = films.find(film => film.id === id);
  
  // Get sessions for this movie
  const movieSessions = sessions.filter(session => session.filmId === id);
  
  // Get recommendations (random movies, excluding current)
  const recommendations = getRandomItems(
    films.filter(film => film.id !== id),
    4
  );

  // Set up the mapped movie whenever the film changes
  useEffect(() => {
    if (movie) {
      setMappedMovie({
        id: parseInt(movie.id),
        title: movie.title,
        description: movie.description,
        posterUrl: movie.posterUrl,
        trailerUrl: movie.trailerUrl || "",
        ageRating: movie.ageRating || "13+",
        rating: movie.rating,
        originalRating: movie.rating,
        releaseYear: movie.year,
        runtime: movie.runtime || "2 hrs",
        genres: movie.genres,
        cast: movie.cast
      });
    }
  }, [movie]);

  // Handle movie updates (like when ratings change from reviews)
  const handleMovieUpdate = (updatedMovie: Movie) => {
    // Update the local state
    setMappedMovie(updatedMovie);
    
    // Update the global films context
    setFilms(prevFilms => 
      prevFilms.map(film => {
        if (film.id === id) {
          // Get the true original rating (before any reviews)
          // If this is the first update, store the current rating as original
          // Otherwise, keep the existing originalRating
          const trueOriginalRating = film.originalRating !== undefined ? 
            film.originalRating : 
            film.rating;
          
          return {
            ...film,
            rating: updatedMovie.rating,
            originalRating: trueOriginalRating
          };
        }
        return film;
      })
    );
  };

  if (!movie || !mappedMovie) {
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
    runtime: film.runtime || "2 hrs",
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
          <MovieTabs 
            movie={mappedMovie} 
            sessions={mappedSessions}
            onMovieUpdate={handleMovieUpdate}
          />
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
