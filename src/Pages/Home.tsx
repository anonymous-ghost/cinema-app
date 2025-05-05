import React from "react";
import FilmsCard from "../components/FilmsCard";
import { Film } from "../types";

// Використовуємо ті самі дані фільмів, що є в AdminPanel
const MOCK_FILMS: Film[] = [
  {
    id: "1",
    title: "Magic travel to Archem",
    description: "Jake Sully lives with his newfound family formed on the planet of Pandora.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX1000_.jpg",
    cast: ["Sam Worthington", "Zoe Saldana"],
    year: 2024,
    genres: ["Fantasy", "Adventure", "Magic"],
    rating: 8.8,
    trailerUrl: "https://www.youtube.com/watch?v=d9MyW72ELq0"
  },
  {
    id: "2",
    title: "The Batman",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
    cast: ["Robert Pattinson", "Zoë Kravitz"],
    year: 2022,
    genres: ["Action", "Crime", "Drama"],
    rating: 7.8,
    trailerUrl: "https://www.youtube.com/watch?v=mqqft2x_Aa4"
  },
  {
    id: "3",
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    year: 2010,
    genres: ["Sci-Fi", "Action", "Thriller"],
    rating: 8.8,
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0"
  },
  {
    id: "4",
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    cast: ["Tim Robbins", "Morgan Freeman"],
    year: 1994,
    genres: ["Drama"],
    rating: 9.3,
    trailerUrl: "https://www.youtube.com/watch?v=6hB3S9bIaco"
  },
  {
    id: "5",
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    year: 2008,
    genres: ["Action", "Crime", "Drama"],
    rating: 9.0,
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY"
  },
  {
    id: "6",
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    year: 1994,
    genres: ["Crime", "Drama"],
    rating: 8.9,
    trailerUrl: "https://www.youtube.com/watch?v=s7EdQ4FqbhY"
  },
  {
    id: "7",
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    year: 1999,
    genres: ["Action", "Sci-Fi"],
    rating: 8.7,
    trailerUrl: "https://www.youtube.com/watch?v=vKQi3bBA1y8"
  },
  {
    id: "8",
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    year: 1994,
    genres: ["Drama", "Romance"],
    rating: 8.8,
    trailerUrl: "https://www.youtube.com/watch?v=bLvqoHBptjg"
  }
];

const Home: React.FC = () => {
  return (
    <main>
      <div className="container">
        <div className="main-text">
          <h1 className="text-netflix">NETFLIX MOVIES</h1>
          <h3 className="text-current">Current and New Releases</h3>
        </div>
        <div className="films">
          {MOCK_FILMS.map((film) => (
            <FilmsCard key={film.id} film={film} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
