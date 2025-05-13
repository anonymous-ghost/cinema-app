import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import TabButton from "./MovieTabs/TabButton";
import MovieTabPanel from "./MovieTabs/MovieTabPanel";
import MovieTrailer from "./MovieTrailer";
import MovieSeats from "./MovieSeats";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { Movie, Session, Review, ReviewSubmitData } from "@/types/movie";
import { calculateAverageRating } from "@/lib/utils";
import { useAuth } from "../../contexts/AuthContext";

// Props expected by the component
interface MovieTabsProps {
  movie: Movie;
  sessions: Session[];
  onMovieUpdate: (updatedMovie: Movie) => void;
}

// Types of tabs that can be switched between
type TabType = "trailer" | "seans" | "review";

// Main component for tabs
const MovieTabs = ({ movie, sessions, onMovieUpdate }: MovieTabsProps) => {
  // Active tab (default is "seans")
  const [activeTab, setActiveTab] = useState<TabType>("seans");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const { currentUser } = useAuth();

  // Get the review being edited
  const editingReview = editingReviewId ? reviews.find(r => r.id === editingReviewId) : null;

  // Load reviews from localStorage when component mounts
  useEffect(() => {
    const storageKey = `movie_reviews_${movie.id}`;
    const storedReviews = localStorage.getItem(storageKey);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, [movie.id]);

  // Handle adding a new review
  const handleAddReview = (reviewData: ReviewSubmitData) => {
    // Create a unique ID for the review
    const newId = `review_${Date.now()}`;
    
    const newReview: Review = {
      ...reviewData,
      id: newId,
      createdAt: new Date().toISOString(),
      userId: reviewData.userId || currentUser?.id // Use provided userId or currentUser.id
    };

    const updatedReviews = [...reviews, newReview];
    updateReviews(updatedReviews);
  };

  // Handle editing a review
  const handleEditReview = (reviewId: string) => {
    setEditingReviewId(reviewId);
  };

  // Handle saving an edited review
  const handleSaveEditedReview = (reviewData: ReviewSubmitData) => {
    if (!editingReviewId) return;

    const updatedReviews = reviews.map(review => {
      if (review.id === editingReviewId) {
        return {
          ...review,
          author: reviewData.author,
          text: reviewData.text,
          rating: reviewData.rating,
          // Preserve the original userId, or use the one from reviewData if available
          userId: reviewData.userId || review.userId || currentUser?.id
        };
      }
      return review;
    });

    updateReviews(updatedReviews);
    setEditingReviewId(null);
  };

  // Handle deleting a review
  const handleDeleteReview = (reviewId: string) => {
    // Find the review by ID
    const reviewToDelete = reviews.find(r => r.id === reviewId);
    
    // Only allow deletion if the review exists and belongs to the current user or if user is admin
    if (reviewToDelete && currentUser && 
        (reviewToDelete.userId === currentUser.id || 
         (!reviewToDelete.userId && reviewToDelete.author === currentUser.name) || 
         currentUser.role === 'admin')) {
      
      if (window.confirm("Are you sure you want to delete this review?")) {
        const updatedReviews = reviews.filter(review => review.id !== reviewId);
        updateReviews(updatedReviews);
      }
    } else {
      console.error("Cannot delete review: unauthorized");
    }
  };

  // Cancel editing a review
  const handleCancelEdit = () => {
    setEditingReviewId(null);
  };

  // Update reviews in state and localStorage, and update movie rating
  const updateReviews = (updatedReviews: Review[]) => {
    setReviews(updatedReviews);
    
    // Store reviews in localStorage
    localStorage.setItem(
      `movie_reviews_${movie.id}`,
      JSON.stringify(updatedReviews)
    );
    
    // Update movie rating based on reviews
    const ratings = updatedReviews.map(review => review.rating);
    
    // If there are no reviews left, we should revert to the original rating
    // Otherwise, calculate the weighted average
    let newRating: number;
    if (ratings.length === 0) {
      // When all reviews are deleted, revert to original rating
      // Use the original rating or default to 0 if undefined
      newRating = movie.originalRating !== undefined ? movie.originalRating : 0;
    } else {
      // Calculate weighted average with existing reviews
      newRating = calculateAverageRating(ratings, movie.originalRating);
    }
    
    // Update the movie with the new rating
    const updatedMovie = { ...movie, rating: newRating };
    onMovieUpdate(updatedMovie);
  };

  return (
    <div className="mt-8">
      {/* Tab navigation panel */}
      <div className="border-b border-[#2D2D2D] mb-6">
        <div className="flex">
          {/* Tab button: Trailer */}
          <TabButton
            label="Trailer"
            isActive={activeTab === "trailer"}
            onClick={() => setActiveTab("trailer")}
          />
          {/* Tab button: Seans */}
          <TabButton
            label="Seans"
            isActive={activeTab === "seans"}
            onClick={() => setActiveTab("seans")}
          />
          {/* Tab button: Review */}
          <TabButton
            label="Review"
            isActive={activeTab === "review"}
            onClick={() => setActiveTab("review")}
          />
        </div>
      </div>

      {/* Tab content with animation on change */}
      <AnimatePresence mode="wait">
        {activeTab === "trailer" && (
          <MovieTabPanel name="trailer">
            <MovieTrailer trailerUrl={movie.trailerUrl} />
          </MovieTabPanel>
        )}

        {activeTab === "seans" && (
          <MovieTabPanel name="seans">
            <MovieSeats movieId={movie.id} sessions={sessions} />
          </MovieTabPanel>
        )}

        {activeTab === "review" && (
          <MovieTabPanel name="review">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Reviews</h3>
              <ReviewList 
                reviews={reviews} 
                onEditReview={handleEditReview}
                onDeleteReview={handleDeleteReview}
                currentUserId={currentUser?.id}
              />
              
              {editingReviewId ? (
                <ReviewForm 
                  movieId={movie.id} 
                  onSubmit={handleSaveEditedReview}
                  initialReview={editingReview}
                  onCancel={handleCancelEdit}
                  isEditing={true}
                />
              ) : (
                <ReviewForm 
                  movieId={movie.id} 
                  onSubmit={handleAddReview}
                />
              )}
            </div>
          </MovieTabPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovieTabs;