import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TabButton from "./MovieTabs/TabButton";
import MovieTabPanel from "./MovieTabs/MovieTabPanel";
import MovieTrailer from "./MovieTrailer";
import MovieSeats from "./MovieSeats";
import { Movie, Session } from "@/types/movie";

// Props expected by the component
interface MovieTabsProps {
  movie: Movie;
  sessions: Session[];
}

// Types of tabs that can be switched between
type TabType = "trailer" | "seans" | "review";

// Main component for tabs
const MovieTabs = ({ movie, sessions }: MovieTabsProps) => {
  // Active tab (default is "seans")
  const [activeTab, setActiveTab] = useState<TabType>("seans");

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
              <p className="text-gray-400">
                No reviews yet. Be the first to leave a review!
              </p>
            </div>
          </MovieTabPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovieTabs;