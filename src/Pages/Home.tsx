import React from "react";
import FilmsCard from "../components/FilmsCard";
import { Film } from "../types";
import { useFilms } from "../contexts/FilmsContext";
import { sortFilms } from "../utils/filmSort";

const Home: React.FC = () => {
  // Отримуємо фільми з контексту
  const { films } = useFilms();
  
  // Сортуємо фільми
  const sortedFilms = sortFilms(films);

  return (
    <main>
      <div className="container">
        <div className="main-text">
          <h1 className="text-netflix">NETFLIX MOVIES</h1>
          <h3 className="text-current">Current and New Releases</h3>
        </div>
        <div className="films">
          {sortedFilms.length > 0 ? (
            sortedFilms.map((film: Film) => (
              <FilmsCard key={film.id} film={film} />
            ))
          ) : (
            [...Array(12)].map((_, index) => (
              <FilmsCard key={index} />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
