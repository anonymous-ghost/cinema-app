import React, { useState, useEffect } from "react";
import { Film, Session } from "../types";
import { Dialog } from "../components/ui/dialog";
import "../styles/AdminPanel.css";
import "../styles/FormStyles.css";
import "../styles/ActionButtons.css";
import { Link } from 'react-router-dom';
import { useFilms } from "../contexts/FilmsContext";
import { sortFilms } from "../utils/filmSort";

export const MOCK_FILMS: Film[] = [
  {
    id: "1",
    title: "Magic travel to Archem",
    description: "Jake Sully lives with his newfound family formed on the planet of Pandora.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX1000_.jpg",
    cast: ["Sam Worthington", "Zoe Saldana"],
    year: 2025,
    genres: ["Fantasy", "Adventure", "Magic"],
    rating: 8.8,
    trailerUrl: "https://www.youtube.com/watch?v=d9MyW72ELq0",
    isNew: true
  },
  {
    id: "2",
    title: "Magic travel to Archem 2",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
    cast: ["Robert Pattinson", "Zoë Kravitz"],
    year: 2024,
    genres: ["Fantasy", "Adventure", "Magic"],
    rating: 8.8,
    trailerUrl: "https://www.youtube.com/watch?v=mqqft2x_Aa4",
    isNew: true
  },
  {
    id: "3",
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BODdjMjM3NGQtZDA5OC00NGE4LWIyZDQtZjYwOGZlMTM5ZTQ1XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    year: 2023,
    genres: ["Sci-Fi", "Action", "Adventure"],
    rating: 8.5,
    trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w",
    isNew: true
  },
  {
    id: "4",
    title: "Oppenheimer",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
    year: 2023,
    genres: ["Biography", "Drama", "History"],
    rating: 8.9,
    trailerUrl: "https://www.youtube.com/watch?v=uYPbbksJxIg"
  },
  {
    id: "5",
    title: "After. Happily ever after",
    description: "The fourth and final installment in the 'After' film series, following the passionate yet turbulent relationship of Tessa Young and Hardin Scott as they face the aftermath of their breakup and the possibility of a future together.",
    posterUrl: "/posters/after-happily-ever-after-16155.jpg",
    cast: ["Josephine Langford", "Hero Fiennes Tiffin", "Louise Lombard"],
    year: 2022,
    genres: ["Drama", "Romance"],
    rating: 7.9,
    trailerUrl: "https://www.youtube.com/watch?v=3stfdUnMGP0"
  },
  {
    id: "6",
    title: "The Batman",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Jeffrey Wright"],
    year: 2022,
    genres: ["Action", "Crime", "Drama"],
    rating: 8.3,
    trailerUrl: "https://www.youtube.com/watch?v=mqqft2x_Aa4"
  },
  {
    id: "7",
    title: "Spider-Man: No Way Home",
    description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
    year: 2021,
    genres: ["Action", "Adventure", "Fantasy"],
    rating: 8.2,
    trailerUrl: "https://www.youtube.com/watch?v=JfVOs4VSpmA"
  },
  {
    id: "8",
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    year: 2019,
    genres: ["Drama", "Thriller"],
    rating: 8.5,
    trailerUrl: "https://www.youtube.com/watch?v=5xH0HfJHsaY"
  },
  {
    id: "9",
    title: "Avengers: Endgame",
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    year: 2019,
    genres: ["Action", "Adventure", "Drama"],
    rating: 8.4,
    trailerUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
  },
  {
    id: "10",
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterUrl: "https://upload.wikimedia.org/wikipedia/uk/2/29/Interstellar_film_poster2.jpg",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    year: 2014,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    rating: 8.6,
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E"
  },
  {
    id: "11",
    title: "Joker",
    description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
    year: 2019,
    genres: ["Crime", "Drama", "Thriller"],
    rating: 8.4,
    trailerUrl: "https://www.youtube.com/watch?v=zAGVQLHvwOY"
  },
  {
    id: "12",
    title: "The Revenant",
    description: "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
    cast: ["Leonardo DiCaprio", "Tom Hardy", "Will Poulter"],
    year: 2015,
    genres: ["Action", "Adventure", "Drama"],
    rating: 8.0,
    trailerUrl: "https://www.youtube.com/watch?v=LoebZZ8K5N0"
  }
];

//SESSIONS
/*export*/ const MOCK_SESSIONS: Session[] = [
  { id: "1", filmId: "1", date: "2025-04-20", time: "19:00", price: 120, hall: "IMAX" },
  { id: "2", filmId: "1", date: "2025-04-20", time: "21:30", price: 120, hall: "Hall 2" },
  { id: "3", filmId: "1", date: "2025-04-20", time: "21:30", price: 130, hall: "Hall 2" }
];


const HALLS = ["IMAX", "Hall 1", "Hall 2", "Hall 3", "Hall 4"];
const DEFAULT_PRICES = { "IMAX": 250, "Hall 1": 200, "Hall 2": 180, "Hall 3": 180, "Hall 4": 160 };
const GENRE_OPTIONS = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", 
  "Drama", "Family", "Fantasy", "Horror", "Mystery", "Romance", 
  "Sci-Fi", "Thriller", "War", "Magic"].map(genre => ({ value: genre, label: genre }));
const AdminPanel: React.FC = () => {
  const { films, setFilms } = useFilms();
  const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);
  const [isFilmDialogOpen, setIsFilmDialogOpen] = useState(false);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  const [editingFilm, setEditingFilm] = useState<Film | null>(null);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [prices, setPrices] = useState<Record<string, number>>(DEFAULT_PRICES);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filmForm, setFilmForm] = useState<Partial<Film>>({
    title: "", description: "", cast: [], year: new Date().getFullYear(),
    genres: [], rating: 0, trailerUrl: "", isNew: false
  });
  
  const [sessionForm, setSessionForm] = useState<Partial<Session>>({
    filmId: "", date: new Date().toISOString().split('T')[0],
    time: "19:00", price: 200, hall: ""
  });
  useEffect(() => {
    if (!isFilmDialogOpen) {
      setEditingFilm(null);
      setFilmForm({
        title: "", description: "", cast: [], year: new Date().getFullYear(),
        genres: [], rating: 0, trailerUrl: "", isNew: false
      });
      setPosterFile(null);
      setPosterPreview("");
    }
  }, [isFilmDialogOpen]);
  // Reset session dialog form when closing
  useEffect(() => {
    if (!isSessionDialogOpen) {
      setEditingSession(null);
      setSessionForm({
        filmId: films[0]?.id || "", date: new Date().toISOString().split('T')[0],
        time: "19:00", hall: HALLS[0]
      });
    }
  }, [isSessionDialogOpen, films]);

  // Set session default price based on hall
  useEffect(() => {
    if (isSessionDialogOpen && !editingSession) {
      const defaultHall = HALLS[0] || "";
      setSessionForm({
        filmId: films[0]?.id || "", date: new Date().toISOString().split('T')[0],
        time: "19:00", hall: defaultHall, price: prices[defaultHall] || 200
      });
    }
  }, [isSessionDialogOpen, films, prices, editingSession]);
  // Load film data for editing
  useEffect(() => {
    if (editingFilm) {
      setFilmForm({
        title: editingFilm.title, description: editingFilm.description,
        cast: editingFilm.cast, year: editingFilm.year, genres: editingFilm.genres,
        rating: editingFilm.rating, trailerUrl: editingFilm.trailerUrl || "",
        isNew: editingFilm.isNew || false
      });
      setPosterPreview(editingFilm.posterUrl);
    }
  }, [editingFilm]);
  // Load session data for editing
  useEffect(() => {
    if (editingSession) {
      setSessionForm({
        filmId: editingSession.filmId, date: editingSession.date,
        time: editingSession.time, price: editingSession.price,
        hall: editingSession.hall
      });
    }
  }, [editingSession]);
  // Form change handlers
  const handleFilmFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilmForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSessionFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'hall' && prices[value]) {
      setSessionForm(prev => ({ ...prev, [name]: value, price: prices[value] }));
    } else {
      setSessionForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPosterFile(file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };
  // Save handlers
  const handleSaveFilm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!filmForm.title || !filmForm.description) {
      alert("Please fill in all required fields");
      return;
    }
    
    const castArray = Array.isArray(filmForm.cast) 
      ? filmForm.cast 
      : (formatCastForInput(filmForm.cast)?.split(',').map(s => s.trim()).filter(Boolean) || []);
    
    const posterUrl = posterFile 
      ? posterPreview 
      : (editingFilm?.posterUrl || "https://via.placeholder.com/300x450?text=No+Poster");
    
    const newFilm: Film = {
      id: editingFilm?.id || `f${Date.now()}`,
      title: filmForm.title || "",
      description: filmForm.description || "",
      posterUrl,
      cast: castArray,
      year: typeof filmForm.year === 'number' ? filmForm.year : Number(filmForm.year) || new Date().getFullYear(),
      genres: Array.isArray(filmForm.genres) ? filmForm.genres : [],
      rating: typeof filmForm.rating === 'number' ? filmForm.rating : Number(filmForm.rating) || 0,
      trailerUrl: filmForm.trailerUrl || "",
      isNew: filmForm.isNew || false
    };
    
    setFilms(prev => editingFilm 
      ? prev.map(f => f.id === editingFilm.id ? newFilm : f) 
      : [...prev, newFilm]
    );
    
    setIsFilmDialogOpen(false);
  };

  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sessionForm.filmId || !sessionForm.date || !sessionForm.time || !sessionForm.hall) {
      alert("Please fill in all required fields");
      return;
    }
    const newSession: Session = {
      id: editingSession?.id || `s${Date.now()}`,
      filmId: sessionForm.filmId || "",
      date: sessionForm.date || "",
      time: sessionForm.time || "",
      price: Number(sessionForm.price) || 0,
      hall: sessionForm.hall || ""
    };
    
    setSessions(prev => editingSession 
      ? prev.map(s => s.id === editingSession.id ? newSession : s) 
      : [...prev, newSession]
    );
    setIsSessionDialogOpen(false);
  };

  const handleDeleteFilm = (id: string) => {
    if (window.confirm('Are you sure you want to delete this film? All associated sessions will also be deleted.')) {
      setFilms(prev => prev.filter(f => f.id !== id));
      setSessions(prev => prev.filter(s => s.filmId !== id));
    }
  };

  const handleDeleteSession = (id: string) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      setSessions(prev => prev.filter(s => s.id !== id));
    }
  };
  // Formatting helpers
  const formatGenresForInput = (genres: string[] | undefined) => Array.isArray(genres) ? genres.join(', ') : '';
  const formatCastForInput = (cast: string[] | undefined) => Array.isArray(cast) ? cast.join(', ') : '';

  return (
    <div className="admin-panel">
      {/* Movies Section */}
      <div className="admin-section">
        <div className="section-header">
          <div className="section-title-area">
            <h2 className="netflix-title">NETFLIX MOVIES</h2>
            <p className="section-subtitle">Manage your movie catalog</p>
          </div>
          <button className="netflix-button" onClick={() => setIsFilmDialogOpen(true)}>Add Movie</button>
        </div>
        <table className="netflix-table">
          <thead>
            <tr>
              <th className="poster-column">Poster</th>
              <th className="title-column">Title</th>
              <th className="year-column">Year</th>
              <th className="rating-column">Rating</th>
              <th className="genres-column">Genres</th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortFilms(films).map(film => (
              <tr key={film.id}>
                <td><img src={film.posterUrl} alt={film.title} className="poster-thumbnail" /></td>
                <td className="title-cell">
                  {film.title}
                  {film.isNew && <span className="new-badge">NEW</span>}
                </td>
                <td>{film.year}</td>
                <td>{film.rating}</td>
                <td className="genres-cell">{film.genres.join(', ')}</td>
                <td>
                  <div className="netflix-actions">
                    <button className="netflix-edit-btn" onClick={() => { setEditingFilm(film); setIsFilmDialogOpen(true); }}>Edit</button>
                    <button className="netflix-delete-btn" onClick={() => handleDeleteFilm(film.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Sessions Section */}
      <div className="admin-section">
        <div className="section-header">
          <div className="section-title-area">
            <h2 className="netflix-title">SESSIONS</h2>
            <p className="section-subtitle">Manage movie sessions and schedules</p>
          </div>
          <button className="netflix-button" onClick={() => setIsSessionDialogOpen(true)} disabled={films.length === 0}>Add Session</button>
        </div>

        <table className="netflix-table">
          <thead>
            <tr>
              <th>Movie</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Hall</th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(session => {
              const film = films.find(f => f.id === session.filmId);
              return (
                <tr key={session.id}>
                  <td>{film?.title || 'Unknown Film'}</td>
                  <td>{session.date}</td>
                  <td>{session.time}</td>
                  <td>{session.price} UAH</td>
                  <td>{session.hall}</td>
                  <td>
                    <div className="netflix-actions">
                      <button className="netflix-edit-btn" onClick={() => { setEditingSession(session); setIsSessionDialogOpen(true); }}>Edit</button>
                      <button className="netflix-delete-btn" onClick={() => handleDeleteSession(session.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Film Dialog */}
      <Dialog open={isFilmDialogOpen} onOpenChange={setIsFilmDialogOpen} title={editingFilm ? "Edit Movie" : "Add Movie"}>
        <form onSubmit={handleSaveFilm} className="space-y-4">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input name="title" value={filmForm.title || ''} onChange={handleFilmFormChange} className="form-input" required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea name="description" value={filmForm.description || ''} onChange={handleFilmFormChange} rows={3} className="form-textarea" required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Genres</label>
            <div className="checkbox-grid scrollable-checkboxes">
              {GENRE_OPTIONS.map(genre => (
                <label key={genre.value} className="checkbox-item">
                  <input type="checkbox" value={genre.value} 
                    checked={filmForm.genres?.includes(genre.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilmForm(prev => ({ ...prev, genres: [...(prev.genres || []), genre.value] }));
                      } else {
                        setFilmForm(prev => ({ ...prev, genres: (prev.genres || []).filter(g => g !== genre.value) }));
                      }
                    }}
                    className="checkbox-input" />
                  <span>{genre.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group half-width">
              <label className="form-label">Year</label>
              <input name="year" type="number" value={filmForm.year || new Date().getFullYear()} 
                onChange={handleFilmFormChange} min={1900} max={new Date().getFullYear() + 5} className="form-input" />
            </div>
            
            <div className="form-group half-width">
              <label className="form-label">Rating</label>
              <input name="rating" type="number" value={filmForm.rating || ''} 
                onChange={handleFilmFormChange} min={0} max={10} step={0.1} className="form-input" />
            </div>
          </div>
          
          <div className="form-group">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={filmForm.isNew || false}
                onChange={(e) => setFilmForm(prev => ({ ...prev, isNew: e.target.checked }))}
                className="checkbox-input"
              />
              <span>Mark as New Release</span>
            </label>
          </div>
          
          <div className="form-group">
            <label className="form-label">Poster</label>
            <div className="poster-upload">
              <input type="file" id="poster-upload" accept="image/*" onChange={handlePosterChange} className="poster-input" />
              <label htmlFor="poster-upload" className="poster-upload-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{marginRight: '8px'}} viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
                Choose file
              </label>
              <span className="file-name">{posterFile ? posterFile.name : "No file chosen"}</span>
              {posterPreview && <div className="poster-preview"><img src={posterPreview} alt="Preview" id="preview" /></div>}
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Trailer (YouTube link)</label>
            <input name="trailerUrl" type="url" value={filmForm.trailerUrl || ''} 
              onChange={handleFilmFormChange} placeholder="https://www.youtube.com/watch?v=..." className="form-input" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Cast (comma separated)</label>
            <input name="cast" value={formatCastForInput(filmForm.cast)} 
              onChange={(e) => setFilmForm(prev => ({ ...prev, cast: e.target.value.split(',').map(s => s.trim()).filter(s => s) }))} 
              className="form-input" placeholder="Actor 1, Actor 2, Actor 3" />
          </div>
          
          <div className="form-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsFilmDialogOpen(false)}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn-primary">Save</button>
          </div>
        </form>
      </Dialog>
      {/* Session Dialog */}
      <Dialog open={isSessionDialogOpen} onOpenChange={setIsSessionDialogOpen} title={editingSession ? "Edit Session" : "Add Session"}>
        <form onSubmit={handleSaveSession} className="space-y-4">
          <div className="form-group">
            <label className="form-label">Movie</label>
            <select name="filmId" value={sessionForm.filmId} onChange={handleSessionFormChange} className="form-select" required>
              {films.map(film => (<option key={film.id} value={film.id}>{film.title}</option>))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Date</label>
            <div className="relative">
              <input name="date" type="date" value={sessionForm.date} onChange={handleSessionFormChange} className="form-input pr-10" required/>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">📅</span>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Time</label>
            <div className="relative">
              <input name="time" type="time" value={sessionForm.time} onChange={handleSessionFormChange} className="form-input pr-10" required/>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">🕒</span>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Hall (optional)</label>
            <select name="hall" value={sessionForm.hall} onChange={handleSessionFormChange} className="form-select">
              <option value="">Select hall</option>
              {HALLS.map(hall => (<option key={hall} value={hall}>{hall} - {prices[hall]} UAH</option>))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Price</label>
            <input name="price" type="number" value={sessionForm.price} onChange={handleSessionFormChange} className="form-input" min={0} required/>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsSessionDialogOpen(false)}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn-primary">Save</button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
export default AdminPanel; 