import { useState, useEffect } from "react";
import FilmsCard from "../components/FilmsCard";
import "../styles/Search.css";

const Search = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All genres");
  const [selectedYear, setSelectedYear] = useState("Any year");
  const [selectedRating, setSelectedRating] = useState("Any rating");
  
  // Mock data for demonstration - in a real app, this would come from an API
  const genres = ["All genres", "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "History", "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"];
  const years = ["Any year", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"];
  const ratings = ["Any rating", "9+", "8+", "7+", "6+", "5+", "4+","3+", "2+"];
  
  // Full movie dataset with different genres and ratings (12 movies total)
  const allMovies = [
    {
      title: "Avatar 3",
      rating: 8.9,
      image: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX1000_.jpg",
      categories: ["Sci-Fi", "Adventure", "Action"],
      year: "2025"
    },
    {
      title: "Blade",
      rating: 8.3,
      image: "https://upload.wikimedia.org/wikipedia/ru/8/88/Blade-poster.jpg",
      categories: ["Action", "Horror", "Fantasy"],
      year: "2024"
    },
    {
      title: "Dune: Part Two",
      rating: 8.8,
      image: "https://upload.wikimedia.org/wikipedia/en/5/52/Dune_Part_Two_poster.jpeg",
      categories: ["Sci-Fi", "Adventure", "Drama"],
      year: "2023"
    },
    {
      title: "Barbie",
      rating: 7.0,
      image: "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
      categories: ["Adventure", "Comedy", "Fantasy"],
      year: "2023"
    },
    {
      title: "The Batman",
      rating: 7.8,
      image: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
      categories: ["Action", "Crime", "Drama"],
      year: "2022"
    },
    {
      title: "Spider-Man: No Way Home",
      rating: 8.2,
      image: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg",
      categories: ["Action", "Adventure", "Fantasy"],
      year: "2021"
    },
    {
      title: "Soul",
      rating: 8.0,
      image: "https://m.media-amazon.com/images/M/MV5BZGE1MDg5M2MtNTkyZS00MTY5LTg1YzUtZTlhZmM1Y2EwNmFmXkEyXkFqcGdeQXVyNjA3OTI0MDc@._V1_.jpg",
      categories: ["Animation", "Adventure", "Comedy"],
      year: "2020"
    },
    {
      title: "Joker",
      rating: 8.4,
      image: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
      categories: ["Crime", "Drama", "Thriller"],
      year: "2019"
    },
    {
      title: "Interstellar",
      rating: 8.7,
      image: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      categories: ["Sci-Fi", "Adventure", "Drama"],
      year: "2014"
    },
  
  
    {
      title: "Parasite",
      rating: 8.6,
      image: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
      categories: ["Comedy", "Drama", "Thriller"],
      year: "2019"
    },
    {
      title: "Joker",
      rating: 8.4,
      image: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
      categories: ["Crime", "Drama", "Thriller"],
      year: "2019"
    },
    {
      title: "Avengers: Endgame",
      rating: 8.4,
      image: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
      categories: ["Action", "Adventure", "Drama"],
      year: "2019"
    },
  ];
  
  // State for filtered results
  const [filteredMovies, setFilteredMovies] = useState(allMovies);
  
  // Apply filters whenever search criteria change
  useEffect(() => {
    let results = allMovies;
    
    // Filter by title
    if (searchTitle.trim() !== "") {
      results = results.filter(movie => 
        movie.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }
    
    // Filter by genre
    if (selectedGenre !== "All genres") {
      results = results.filter(movie => 
        movie.categories.includes(selectedGenre)
      );
    }
    
    // Filter by year
    if (selectedYear !== "Any year") {
      results = results.filter(movie => 
        movie.year === selectedYear
      );
    }
    
    // Filter by rating
    if (selectedRating !== "Any rating") {
      const minRating = parseInt(selectedRating.replace("+", ""));
      results = results.filter(movie => 
        movie.rating >= minRating
      );
    }
    
    setFilteredMovies(results);
  }, [searchTitle, selectedGenre, selectedYear, selectedRating]);
  
  return (
    <main className="search-page">
      <div className="container">
        <div className="main-text">
          <h1 className="text-netflix search-title">SEARCH MOVIES</h1>
          <p className="search-subtitle">Find movies by filters</p>
        </div>
        
        <div className="search-filters">
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder="Title..." 
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filters-wrapper">
            <select 
              value={selectedGenre} 
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="filter-select"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="filter-select"
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            
            <select 
              value={selectedRating} 
              onChange={(e) => setSelectedRating(e.target.value)}
              className="filter-select"
            >
              {ratings.map((rating) => (
                <option key={rating} value={rating}>{rating}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="search-results">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((film, index) => (
              <FilmsCard 
                key={index} 
                title={film.title} 
                rating={film.rating} 
                image={film.image} 
                categories={film.categories} 
              />
            ))
          ) : (
            <div className="no-results">No movies found matching your criteria</div>
          )}
        </div>
        
        <div className="pagination">
          <div className="page-number">1</div>
        </div>
      </div>
    </main>
  );
};

export default Search;