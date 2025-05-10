import { Link } from "react-router-dom";

const Header = () => {
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
          <Link to="/admin" className="pages-link">
            Admin Panel
          </Link>
        </div>
        <div className="header-info">
          <a className="header-search" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            Search
          </a>
          <a className="header-cart" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="16"
              fill="currentColor"
              className="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            Cart
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

