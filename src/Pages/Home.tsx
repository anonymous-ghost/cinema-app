import FilmsCard from "../components/FilmsCard";
import { useFilms } from "../contexts/FilmsContext";
import { sortFilms } from "../utils/filmSort";

const Home = () => {
  const { films } = useFilms();

  return (
    <main>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="main-text" style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 className="text-netflix">CINEMA MOVIES</h1>
          <h3 className="text-current">Current and New Releases</h3>
        </div>
        <div className="films" style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          justifyContent: "center",
          gap: "20px"
        }}>
          {sortFilms(films).map((film) => (
            <FilmsCard key={film.id} film={film} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;