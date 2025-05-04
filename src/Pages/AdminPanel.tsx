import React, { useState, useEffect } from "react";
import { Film, Session } from "../types";
import { Dialog } from "../components/ui/dialog";
import "../styles/AdminPanel.css";
import "../styles/FormStyles.css";
import "../styles/ActionButtons.css";
import { Link } from 'react-router-dom';

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
    title: "Magic travel to Archem",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
    cast: ["Robert Pattinson", "Zoë Kravitz"],
    year: 2024,
    genres: ["Fantasy", "Adventure", "Magic"],
    rating: 8.8,
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
  },
  {
    id: "9",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
    cast: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
    year: 2001,
    genres: ["Adventure", "Drama", "Fantasy"],
    rating: 8.8,
    trailerUrl: "https://www.youtube.com/watch?v=V75dMMIW2B4"
  },
  {
    id: "10",
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    year: 2014,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    rating: 8.6,
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E"
  },
  {
    id: "11",
    title: "The Silence of the Lambs",
    description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    cast: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"],
    year: 1991,
    genres: ["Crime", "Drama", "Thriller"],
    rating: 8.6,
    trailerUrl: "https://www.youtube.com/watch?v=W6Mm8Sbe__o"
  },
  {
    id: "12",
    title: "Fight Club",
    description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    cast: ["Brad Pitt", "Edward Norton", "Meat Loaf"],
    year: 1999,
    genres: ["Drama"],
    rating: 8.8,
    trailerUrl: "https://www.youtube.com/watch?v=SUXWAEX2jlg"
  }
];
//SESSIONS
const MOCK_SESSIONS: Session[] = [
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
  const [films, setFilms] = useState<Film[]>(MOCK_FILMS);
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
    genres: [], rating: 0, trailerUrl: ""
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
        genres: [], rating: 0, trailerUrl: ""
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
        rating: editingFilm.rating, trailerUrl: editingFilm.trailerUrl || ""
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
      trailerUrl: filmForm.trailerUrl || ""
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
            {films.map(film => (
              <tr key={film.id}>
                <td><img src={film.posterUrl} alt={film.title} className="poster-thumbnail" /></td>
                <td className="title-cell">{film.title}</td>
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