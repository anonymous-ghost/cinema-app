import FilmsCard from "../components/FilmsCard";
import { Film } from "../types";
import { useFilms } from "../contexts/FilmsContext";
import { sortFilms } from "../utils/filmSort";

const Home = () => {
  // Поотримуємо фільми з контексту
  const { films } = useFilms();
  
  // Сортируємо фильмu 
  const sortedFilms = sortFilms(films);
  return (
    <main>
      <div className="container">
        <div className="main-text">
          <h1 className="text-netflix">NETFLIX MOVIES</h1>
          <h3 className="text-current">Current and New Releases</h3>
        </div>
        <div className="films">
          {sortedFilms.map((film: Film) => (
            <FilmsCard key={film.id} film={film} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
