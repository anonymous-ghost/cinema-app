import RecommendationCard from "./RecommendationCard";
import { Movie } from "@/types/movie";

interface RecommendationsSectionProps {
  recommendations: Movie[];
}

const RecommendationsSection = ({ recommendations }: RecommendationsSectionProps) => (
  <div className="mb-8">
    <h3 className="text-lg text-medium-grey font-bold">Recommendations</h3>
    <div className="text-xs section-description font-normal mb-4">
      Movies that you might like
    </div>
    <div className="grid grid-cols-2 gap-3">
      {recommendations.map((movie) => (
        <RecommendationCard key={movie.id} movie={movie} />
      ))}
    </div>
  </div>
);

export default RecommendationsSection;
