import RecommendationsSection from "./MovieSidebar/RecommendationSection";
import AdSection from "./MovieSidebar/AdSection";
import SocialLinks from "./MovieSidebar/SocialLinks";
import { Movie } from "@/types/movie";

// Props expected by the component
interface MovieSidebarProps {
  recommendations: Movie[];
  adImageUrl: string;
}

// Sidebar component that includes: recommendations, ad banner, and social media links
const MovieSidebar = ({ recommendations, adImageUrl }: MovieSidebarProps) => (
  <div>
    <RecommendationsSection recommendations={recommendations} />
    <AdSection adImageUrl={adImageUrl} />
    <SocialLinks />
  </div>
);

export default MovieSidebar;
