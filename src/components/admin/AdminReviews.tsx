import { useState, useEffect } from "react";
import { Film } from "@/types";
import { Review, Movie } from "@/types/movie";
import { FaStar, FaTrash, FaHistory } from "react-icons/fa";
import { formatDate, calculateAverageRating } from "@/lib/utils";

// Extended Film interface to include originalRating
interface ExtendedFilm extends Film {
  originalRating?: number;
}

interface AdminReviewsProps {
  films: Film[];
  onFilmsUpdate: (updatedFilms: Film[]) => void;
  currentUserId?: string;
}

interface ExtendedReview extends Review {
  filmTitle?: string;
  userName?: string;
}

const AdminReviews = ({ films, onFilmsUpdate, currentUserId }: AdminReviewsProps) => {
  // Cast films to ExtendedFilm for type safety
  const extendedFilms = films as ExtendedFilm[];
  
  const [selectedFilmId, setSelectedFilmId] = useState<string>("");
  const [reviews, setReviews] = useState<ExtendedReview[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<ExtendedReview[]>([]);
  
  // Load all reviews from localStorage
  useEffect(() => {
    const allReviews: ExtendedReview[] = [];
    
    films.forEach(film => {
      const filmReviews = localStorage.getItem(`movie_reviews_${film.id}`);
      if (filmReviews) {
        const parsedReviews: Review[] = JSON.parse(filmReviews);
        const extendedReviews = parsedReviews.map((review: Review) => {
          const extendedReview: ExtendedReview = {
            ...review,
            filmTitle: film.title
          };

          // Try to get user's name if userId is available
          if (review.userId) {
            const userProfile = localStorage.getItem(`user_profile_${review.userId}`);
            if (userProfile) {
              extendedReview.userName = JSON.parse(userProfile).name;
            } else {
              // Check if it's one of the mock users
              const storedUsers = localStorage.getItem('users');
              if (storedUsers) {
                const users = JSON.parse(storedUsers);
                const user = users.find((u: any) => u.id === review.userId);
                if (user) {
                  extendedReview.userName = user.name;
                }
              }
            }
          }

          return extendedReview;
        });
        
        allReviews.push(...extendedReviews);
      }
    });
    
    setReviews(allReviews);
    setFilteredReviews(allReviews);
  }, [films]);
  
  // Filter reviews when selecting a film
  useEffect(() => {
    if (selectedFilmId) {
      setFilteredReviews(reviews.filter(review => review.movieId === parseInt(selectedFilmId)));
    } else {
      setFilteredReviews(reviews);
    }
  }, [selectedFilmId, reviews]);
  
  // Handle deleting a review
  const handleDeleteReview = (reviewId: string) => {
    // Find the review to delete
    const reviewToDelete = reviews.find(review => review.id === reviewId);
    if (!reviewToDelete) return;
    
    const filmId = reviewToDelete.movieId.toString();
    
    // Get current reviews for this film
    const filmReviews = localStorage.getItem(`movie_reviews_${filmId}`);
    if (!filmReviews) return;
    
    // Remove the review from the film's reviews
    const parsedReviews: Review[] = JSON.parse(filmReviews);
    const updatedReviews = parsedReviews.filter(review => review.id !== reviewId);
    
    // Update localStorage
    localStorage.setItem(`movie_reviews_${filmId}`, JSON.stringify(updatedReviews));
    
    // Recalculate the film's rating
    const ratings = updatedReviews.map(review => review.rating);
    const film = extendedFilms.find(film => film.id === filmId);
    const originalRating = film?.originalRating || film?.rating;
    
    const newRating = calculateAverageRating(ratings, originalRating);
    
    // Update the film with the new rating
    const updatedFilms = films.map(film => {
      if (film.id === filmId) {
        return { ...film, rating: newRating };
      }
      return film;
    });
    
    // Update context
    onFilmsUpdate(updatedFilms);
    
    // Update local state
    setReviews(reviews.filter(review => review.id !== reviewId));
  };

  // Повертає рейтинг фільму до початкового значення і видаляє всі відгуки
  const handleResetRating = (filmId: string) => {
    if (window.confirm("Це видалить ВСІ відгуки для цього фільму! Ви впевнені?")) {
      // Знаходимо фільм
      const film = films.find(f => f.id === filmId);
      if (!film) return;
      
      // Видаляємо всі відгуки для цього фільму
      localStorage.removeItem(`movie_reviews_${filmId}`);
      
      // Відновлюємо оригінальний рейтинг фільму
      const updatedFilms = films.map(f => {
        if (f.id === filmId) {
          return { 
            ...f, 
            rating: f.originalRating || f.rating // Use original rating if available
          };
        }
        return f;
      });
      
      // Оновлюємо контекст з оновленими фільмами
      onFilmsUpdate(updatedFilms);
      
      // Оновлюємо локальний стан відгуків
      setReviews(reviews.filter(review => review.movieId.toString() !== filmId));
      
      alert(`Всі відгуки для фільму "${film.title}" були видалені, і рейтинг фільму повернуто до оригінального значення.`);
    }
  };
  
  return (
    <div className="bg-[#1A1A1A] rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">User Reviews</h2>
      
      <div className="mb-6">
        <label htmlFor="film-filter" className="block mb-2">
          Filter by Film:
        </label>
        <select
          id="film-filter"
          value={selectedFilmId}
          onChange={(e) => setSelectedFilmId(e.target.value)}
          className="w-full bg-[#2D2D2D] text-white p-2 rounded"
        >
          <option value="">All Films</option>
          {films.map(film => (
            <option key={film.id} value={film.id}>
              {film.title}
            </option>
          ))}
        </select>
      </div>
      
      {/* Кнопка для скидання всіх відгуків конкретного фільму */}
      {selectedFilmId && (
        <div className="mb-6">
          <button 
            onClick={() => handleResetRating(selectedFilmId)}
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors flex items-center"
          >
            <FaHistory className="mr-2" /> Видалити всі відгуки фільму
          </button>
          <p className="text-sm text-gray-400 mt-1">
            Поточний рейтинг фільму: {films.find(film => film.id === selectedFilmId)?.rating || "N/A"}
          </p>
        </div>
      )}
      
      {filteredReviews.length === 0 ? (
        <p className="text-gray-400">No reviews found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#2D2D2D]">
                <th className="text-left p-3">Film</th>
                <th className="text-left p-3">Author</th>
                <th className="text-left p-3">User ID</th>
                <th className="text-left p-3">Rating</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Review</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map(review => (
                <tr key={review.id} className="border-b border-[#2D2D2D]">
                  <td className="p-3">{review.filmTitle || films.find(film => film.id === review.movieId.toString())?.title}</td>
                  <td className="p-3">{review.author}</td>
                  <td className="p-3">
                    <span className="text-xs bg-gray-700 p-1 rounded">
                      {review.userId || 'Anonymous'}
                    </span>
                  </td>
                  <td className="p-3 flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{review.rating}/10</span>
                  </td>
                  <td className="p-3">{formatDate(review.createdAt)}</td>
                  <td className="p-3 max-w-sm truncate">{review.text}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      aria-label="Delete review"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminReviews; 