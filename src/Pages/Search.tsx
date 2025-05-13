import { useState, useEffect, useRef } from "react";
import FilmsCard from "../components/FilmsCard";
import "../styles/Search.css";
import { useFilms } from "../contexts/FilmsContext";
import { Film } from "../types";
import { sortFilms } from "../utils/filmSort";

const Search = () => {
  // Initialize state from localStorage if available
  const [searchTitle, setSearchTitle] = useState(() => {
    return localStorage.getItem('searchTitle') || "";
  });
  const [selectedGenre, setSelectedGenre] = useState(() => {
    return localStorage.getItem('selectedGenre') || "All genres";
  });
  const [selectedYear, setSelectedYear] = useState(() => {
    return localStorage.getItem('selectedYear') || "Any year";
  });
  const [selectedRating, setSelectedRating] = useState(() => {
    return localStorage.getItem('selectedRating') || "Any rating";
  });
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(localStorage.getItem('currentPage') || "1");
  });
  const itemsPerPage = 8;
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  // Get films from context
  const { films } = useFilms();

  // Generate dropdown options dynamically
  const allGenres = [...new Set(films.flatMap(film => film.genres))].sort();
  const genres = ["All genres", ...allGenres];
  
  const allYears = [...new Set(films.map(film => film.year.toString()))].sort((a, b) => parseInt(b) - parseInt(a));
  const years = ["Any year", ...allYears];
  
  const ratings = ["Any rating", "9+", "8+", "7+", "6+", "5+", "4+", "3+", "2+"];

  // State for filtered results
  const [filteredMovies, setFilteredMovies] = useState<Film[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchTitle', searchTitle);
    localStorage.setItem('selectedGenre', selectedGenre);
    localStorage.setItem('selectedYear', selectedYear);
    localStorage.setItem('selectedRating', selectedRating);
    localStorage.setItem('currentPage', currentPage.toString());
  }, [searchTitle, selectedGenre, selectedYear, selectedRating, currentPage]);

  // Initialize filtered movies on component mount
  useEffect(() => {
    setFilteredMovies(sortFilms(films));
    setTotalPages(Math.ceil(films.length / itemsPerPage));
  }, [films, itemsPerPage]);

  // Check if we should show navigation arrows based on screen width
  useEffect(() => {
    const checkWidth = () => {
      setShowArrows(window.innerWidth <= 1024 && filteredMovies.length > 4);
    };
    
    checkWidth(); // Initial check
    window.addEventListener('resize', checkWidth);
    
    return () => window.removeEventListener('resize', checkWidth);
  }, [filteredMovies.length]);

  // Scroll to top of results when changing page
  useEffect(() => {
    if (searchResultsRef.current) {
      searchResultsRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  // Apply filters whenever search criteria change
  useEffect(() => {
    let results = [...films];

    // Filter by title
    if (searchTitle.trim() !== "") {
      results = results.filter(movie => 
        movie.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenre !== "All genres") {
      results = results.filter(movie => 
        movie.genres.includes(selectedGenre)
      );
    }

    // Filter by year
    if (selectedYear !== "Any year") {
      results = results.filter(movie => 
        movie.year.toString() === selectedYear
      );
    }

    // Filter by rating
    if (selectedRating !== "Any rating") {
      const minRating = parseInt(selectedRating.replace("+", ""));
      results = results.filter(movie => 
        movie.rating >= minRating
      );
    }

    // Sort results - new films first, then by year
    results = sortFilms(results);

    // Calculate total pages
    setTotalPages(Math.ceil(results.length / itemsPerPage));
    
    // Reset to first page when filters change
    setCurrentPage(1);

    setFilteredMovies(results);
  }, [searchTitle, selectedGenre, selectedYear, selectedRating, films, itemsPerPage]);

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredMovies.slice(startIndex, endIndex);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Scroll horizontally on mobile
  const handleScrollLeft = () => {
    if (searchResultsRef.current) {
      searchResultsRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (searchResultsRef.current) {
      searchResultsRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <div 
          key={i} 
          className={`page-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </div>
      );
    }
    return buttons;
  };

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

        <div className="search-results-container">
          {showArrows && (
            <>
              <button className="arrow-nav arrow-left" onClick={handleScrollLeft}>&lt;</button>
              <button className="arrow-nav arrow-right" onClick={handleScrollRight}>&gt;</button>
            </>
          )}
          
          <div ref={searchResultsRef} className="search-results">
            {getCurrentPageItems().length > 0 ? (
              getCurrentPageItems().map((film) => (
              <FilmsCard 
                  key={film.id} 
                  film={film} 
              />
            ))
          ) : (
            <div className="no-results">No movies found matching your criteria</div>
          )}
        </div>
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            {renderPaginationButtons()}
          </div>
        )}
      </div>
    </main>
  );
};

export default Search;
