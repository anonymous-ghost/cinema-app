import { useState } from "react";
import "../styles/Sessions.css";
import SeatSelector from "../components/SeatSelector";

interface Session {
  id: number;
  movieTitle: string;
  date: string;
  time: string;
  genre: string;
  hall: string;
  image: string;
}

const Sessions = () => {
  const [dateFilter, setDateFilter] = useState<string>("");
  const [timeFilter, setTimeFilter] = useState<string>("");
  const [genreFilter, setGenreFilter] = useState<string>("");
  const [showSeatSelector, setShowSeatSelector] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  // Mock data for sessions - in a real app, this would come from an API
  const sessions: Session[] = [
    {
      id: 1,
      movieTitle: "Avatar",
      date: "2023-07-15",
      time: "18:30",
      genre: "Action",
      hall: "Hall 1",
      image: "https://new.kinogo.fm/uploads/posts/2022-03/251733_1647372642.webp",
    },
    {
      id: 2,
      movieTitle: "The Matrix",
      date: "2023-07-15",
      time: "20:00",
      genre: "Sci-Fi",
      hall: "Hall 2",
      image: "https://new.kinogo.fm/uploads/posts/2022-03/251733_1647372642.webp",
    },
    {
      id: 3,
      movieTitle: "Inception",
      date: "2023-07-16",
      time: "19:00",
      genre: "Thriller",
      hall: "Hall 3",
      image: "https://new.kinogo.fm/uploads/posts/2022-03/251733_1647372642.webp",
    },
    {
      id: 4,
      movieTitle: "Interstellar",
      date: "2023-07-16",
      time: "21:15",
      genre: "Sci-Fi",
      hall: "Hall 1",
      image: "https://new.kinogo.fm/uploads/posts/2022-03/251733_1647372642.webp",
    },
    {
      id: 5,
      movieTitle: "The Dark Knight",
      date: "2023-07-17",
      time: "18:00",
      genre: "Action",
      hall: "Hall 2",
      image: "https://new.kinogo.fm/uploads/posts/2022-03/251733_1647372642.webp",
    },
    {
      id: 6,
      movieTitle: "Pulp Fiction",
      date: "2023-07-17",
      time: "20:30",
      genre: "Crime",
      hall: "Hall 3",
      image: "https://new.kinogo.fm/uploads/posts/2022-03/251733_1647372642.webp",
    },
  ];

  // Filter sessions based on selected filters
  const filteredSessions = sessions.filter((session) => {
    const matchesDate = dateFilter ? session.date === dateFilter : true;
    const matchesTime = timeFilter
      ? session.time.startsWith(timeFilter)
      : true;
    const matchesGenre = genreFilter
      ? session.genre === genreFilter
      : true;

    return matchesDate && matchesTime && matchesGenre;
  });

  // Get unique options for filters
  const dates = [...new Set(sessions.map((session) => session.date))];
  const times = [...new Set(sessions.map((session) => session.time.split(":")[0]))];
  const genres = [...new Set(sessions.map((session) => session.genre))];

  // Format date for display
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  // Calendar icon SVG
  const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#e50914" viewBox="0 0 16 16">
      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
    </svg>
  );

  // Clock icon SVG
  const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#e50914" viewBox="0 0 16 16">
      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
    </svg>
  );

  // Tag icon SVG
  const TagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#e50914" viewBox="0 0 16 16">
      <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
      <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
    </svg>
  );

  // Location icon SVG
  const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#e50914" viewBox="0 0 16 16">
      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
    </svg>
  );

  return (
    <main className="sessions-page">
      <div className="container">
        <div className="main-text">
          <h1 className="text-netflix">CINEMA SESSIONS</h1>
          <h3 className="text-current">View and filter our sessions</h3>
        </div>

        <div className="filter-container">
          <div className="filter-group">
            <label>Date:</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="">All Dates</option>
              {dates.map((date) => (
                <option key={date} value={date}>
                  {formatDate(date)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Time:</label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="">All Times</option>
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}:00
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Genre:</label>
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <button
            className="reset-button"
            onClick={() => {
              setDateFilter("");
              setTimeFilter("");
              setGenreFilter("");
            }}
          >
            Reset Filters
          </button>
        </div>

        <div className="sessions-list">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <div className="session-card" key={session.id}>
                <div className="session-image">
                  <img src={session.image} alt={session.movieTitle} />
                </div>
                <div className="session-info">
                  <h3>{session.movieTitle}</h3>
                  <div className="session-details">
                    <p>
                      <CalendarIcon />
                      <strong>Date:</strong> {formatDate(session.date)}
                    </p>
                    <p>
                      <ClockIcon />
                      <strong>Time:</strong> {session.time}
                    </p>
                    <p>
                      <TagIcon />
                      <strong>Genre:</strong> {session.genre}
                    </p>
                    <p>
                      <LocationIcon />
                      <strong>Hall:</strong> {session.hall}
                    </p>
                  </div>
                  <button 
                    className="book-button" 
                    onClick={() => {
                      setSelectedSession(session);
                      setShowSeatSelector(true);
                    }}
                  >
                    Book Tickets
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-sessions">
              <p>No sessions found matching your filters.</p>
            </div>
          )}
        </div>
        {showSeatSelector && (
          <SeatSelector
            onClose={() => setShowSeatSelector(false)}
            onConfirm={(seats) => {
              console.log(`Booking seats ${seats.join(", ")} for ${selectedSession?.movieTitle}`);
              setShowSeatSelector(false);
            }}
          />
        )}
      </div>
    </main>
  );
};

export default Sessions;