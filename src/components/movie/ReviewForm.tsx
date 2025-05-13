import { useState, useEffect } from "react";
import { Review, ReviewSubmitData } from "@/types/movie";
import StarRating from "./StarRating";
import { useAuth } from "../../contexts/AuthContext";

interface ReviewFormProps {
  movieId: number;
  onSubmit: (review: ReviewSubmitData) => void;
  initialReview?: Review | null;
  onCancel?: () => void;
  isEditing?: boolean;
}

const ReviewForm = ({ 
  movieId, 
  onSubmit, 
  initialReview = null,
  onCancel,
  isEditing = false
}: ReviewFormProps) => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  // Initialize form with review data when editing
  useEffect(() => {
    if (initialReview) {
      setAuthor(initialReview.author || "");
      setText(initialReview.text || "");
      setRating(initialReview.rating || 0);
    } else if (currentUser && !isEditing) {
      // Pre-fill author name for new reviews if user is logged in
      setAuthor(currentUser.name);
    }
  }, [initialReview, currentUser, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!author.trim()) {
      setError("Please enter your name");
      return;
    }
    
    if (!text.trim()) {
      setError("Please enter your review");
      return;
    }
    
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    
    // Submit the review
    onSubmit({
      movieId,
      author,
      text,
      rating,
      // When editing, preserve the original userId if it exists
      userId: isEditing && initialReview ? 
        initialReview.userId || currentUser?.id :
        currentUser?.id
    });
    
    // Only reset form if not editing
    if (!isEditing) {
      setText("");
      setRating(0);
      // Don't reset author if user is logged in
      if (!currentUser) {
        setAuthor("");
      }
    }
    
    setError("");
  };

  return (
    <div className="bg-[#1A1A1A] rounded-lg p-6 mb-6">
      <h4 className="text-lg font-medium mb-4">
        {isEditing ? "Edit Your Review" : "Add Your Review"}
      </h4>
      
      {error && (
        <div className="bg-red-900/50 text-red-200 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="author" className="block mb-2 text-sm">
            Your Name
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full bg-[#2D2D2D] rounded p-2 text-white"
            disabled={currentUser !== null} // Disable name field if logged in
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-sm">
            Rating
          </label>
          <StarRating
            maxRating={10}
            selectedRating={rating}
            onRatingChange={setRating}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="text" className="block mb-2 text-sm">
            Your Review
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full bg-[#2D2D2D] rounded p-2 text-white"
          />
        </div>
        
        <div className="flex space-x-3">
          <button
            type="submit"
            className="px-4 py-2 bg-[#E50914] text-white rounded hover:bg-[#F40612] transition-colors"
          >
            {isEditing ? "Update Review" : "Submit Review"}
          </button>
          
          {isEditing && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-[#333] text-white rounded hover:bg-[#444] transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReviewForm; 