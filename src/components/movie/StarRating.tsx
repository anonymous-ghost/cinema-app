import { FaStar, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  maxRating: number;
  selectedRating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating = ({ maxRating, selectedRating, onRatingChange }: StarRatingProps) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <button
        key={i}
        type="button"
        onClick={() => onRatingChange(i)}
        className="text-xl focus:outline-none"
        aria-label={`Rate ${i} out of ${maxRating}`}
      >
        {i <= selectedRating ? (
          <FaStar className="text-yellow-400" />
        ) : (
          <FaRegStar className="text-gray-400 hover:text-yellow-400" />
        )}
      </button>
    );
  }

  return (
    <div className="flex space-x-1">
      {stars}
      {selectedRating > 0 && (
        <span className="ml-2 text-sm text-gray-300">
          {selectedRating}/{maxRating}
        </span>
      )}
    </div>
  );
};

export default StarRating; 