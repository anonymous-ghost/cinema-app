import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const { isAuthenticated, currentUser, isAdmin, logout } = useAuth();

  return (
    <header>
      <div className="header">
        <div className="header-pages">
          <Link to="/" className="pages-link">
            Home
          </Link>
          <Link to="/sessions" className="pages-link">
            Sessions
          </Link>
          <Link to="/favorites" className="pages-link">
            Favorites
          </Link>
          {isAdmin && (
            <Link to="/admin" className="pages-link">
              Admin Panel
            </Link>
          )}
        </div>
        <div className="header-info">
          <a className="header-search" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            Search
          </a>
          
          {isAuthenticated ? (
            <div className="user-menu">
              <Link to="/bookings" className="header-cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="16"
                  fill="currentColor"
                  className="bi bi-ticket"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zM1.5 4a.5.5 0 0 0-.5.5v1.05a2.5 2.5 0 0 1 0 4.9v1.05a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-1.05a2.5 2.5 0 0 1 0-4.9V4.5a.5.5 0 0 0-.5-.5z" />
                </svg>
                My Bookings
              </Link>
              <div className="user-dropdown">
                <button className="user-dropdown-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                  </svg>
                  {currentUser?.name}
                </button>
                <div className="dropdown-content">
                  <Link to="/profile">Profile</Link>
                  <Link to="/bookings">My Bookings</Link>
                  <button onClick={logout} className="logout-link">Logout</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="login-link">Login</Link>
              <Link to="/register" className="register-link">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

