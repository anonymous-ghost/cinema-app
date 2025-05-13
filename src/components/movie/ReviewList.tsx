import { Review } from "@/types/movie";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { formatDate } from "@/lib/utils";

interface ReviewListProps {
  reviews: Review[];
  onEditReview: (reviewId: string) => void;
  onDeleteReview?: (reviewId: string) => void;
  currentUserId?: string;
}

const ReviewList = ({ reviews, onEditReview, onDeleteReview, currentUserId }: ReviewListProps) => {
  if (reviews.length === 0) {
    return (
      <p className="text-gray-400">
        No reviews yet. Be the first to leave a review!
      </p>
    );
  }

  // Check if a review can be edited by the current user
  const canEditReview = (review: Review): boolean => {
    // If currentUserId is not provided, user is not logged in
    if (!currentUserId) {
      return false;
    }
    
    // If the review has userId and it matches the current user ID, allow editing
    if (review.userId) {
      return review.userId === currentUserId;
    }
    
    // For reviews without userId (created before the userId was implemented),
    // try to match by author name as a fallback mechanism
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        return review.author === user.name;
      } catch (error) {
        console.error("Error parsing stored user:", error);
        return false;
      }
    }
    
    return false;
  };

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-[#2D2D2D] pb-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="font-medium">{review.author}</span>
              <span className="text-gray-400 text-sm ml-2">
                {formatDate(review.createdAt)}
              </span>
            </div>
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span>{review.rating}/10</span>
              
              {/* Action buttons */}
              {canEditReview(review) && (
                <div className="ml-4 flex space-x-2">
                  <button 
                    onClick={() => onEditReview(review.id)}
                    className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    aria-label="Edit review"
                  >
                    <FaEdit size={14} />
                  </button>
                  
                  {onDeleteReview && (
                    <button 
                      onClick={() => onDeleteReview(review.id)}
                      className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      aria-label="Delete review"
                    >
                      <FaTrash size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-300">{review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList; 