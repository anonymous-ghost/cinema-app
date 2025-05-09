import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Movie, Session } from "@/types/movie";
import { Breadcrumb } from "@/components/ui/MovieBreadcrumb";
import MovieDetails from "@/components/movie/MovieDetails";
import MovieTabs from "@/components/movie/MovieTabs";
import MovieSidebar from "@/components/movie/MovieSidebar";

// Placeholder data
const stubMovie: Movie = {
  id: 1,
  title: "Some Movie",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  posterUrl: "https://i.imgur.com/SNeZhan.png",
  trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  ageRating: "13+",
  rating: 4.8,
  releaseYear: 2023,
  runtime: "2 hrs 10 min",
  genres: ["Drama"],
  cast: ["Leo De Vinci", "Hitori"]
};

const stubSessions: Session[] = [
  {
    id: 1,
    movieId: 1,
    date: "12.05.2024",
    time: "12:00",
    occupiedSeats: [
      { row: 1, seat: 3 },
      { row: 2, seat: 5 }
    ]
  },
  {
    id: 2,
    movieId: 1,
    date: "13.05.2024",
    time: "18:00",
    occupiedSeats: [
      { row: 1, seat: 8 },
      { row: 1, seat: 9 }
    ]
  }
];

const stubRecommendations: Movie[] = [
  {
    id: 2,
    title: "Recommended 1",
    description: "A good recommendation.",
    posterUrl: "https://i.imgur.com/ubO63ru.png",
    trailerUrl: "",
    ageRating: "13+",
    rating: 4.2,
    releaseYear: 2022,
    runtime: "1 hr 45 min",
    genres: [],
    cast: []
  },
  {
    id: 3,
    title: "Recommended 2",
    description: "Another great movie.",
    posterUrl: "https://i.imgur.com/ubO63ru.png",
    trailerUrl: "",
    ageRating: "16+",
    rating: 4.5,
    releaseYear: 2021,
    runtime: "2 hrs",
    genres: [],
    cast: []
  }
];


const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id);

  // My test API queries (can be safely removed)

  // const { data: movie, isLoading: isLoadingMovie } = useQuery<Movie>({
  //   queryKey: [`/api/movies/${movieId}`],
  // });

  // const { data: sessions, isLoading: isLoadingSessions } = useQuery<Session[]>({
  //   queryKey: [`/api/movies/${movieId}/sessions`],
  // });

  // const { data: recommendations, isLoading: isLoadingRecommendations } = useQuery<Movie[]>({
  //   queryKey: ['/api/movies/recommendations'],
  // });

  // Imitation loading data (without api)
  
  const movie = stubMovie;
  const sessions = stubSessions;
  const recommendations = stubRecommendations;

  // isLoadingMovie || isLoadingSessions || isLoadingRecommendations

  if (!movie || !sessions || !recommendations) {
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

  return (
    <div className="container mx-auto px-6 py-8">
      <Breadcrumb
        items={[
          { label: "Main page", href: "/" },
          { label: movie.title }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <MovieDetails movie={movie} />
          <MovieTabs movie={movie} sessions={sessions} />
        </div>
        
        <div className="lg:col-span-1">
          <MovieSidebar 
            recommendations={recommendations}
            adImageUrl="https://i.imgur.com/ljfaW3J.png"
          />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
