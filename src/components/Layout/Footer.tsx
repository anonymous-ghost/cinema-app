import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer">
          <div className="footer-text">
            <h1 className="footer-movieapp">MOVIEAPP</h1>
          </div>
          <div className="footer-center">
            <div className="footer-center-text">
              <span className="center-text">
                The best place to discover and track your favorite movies and
                sessions.
              </span>
            </div>
          </div>
          <div className="footer-info-right">
            <Link className="footer-pages" to="/faq">
              FAQ
            </Link>
            <div className="contact-wrapper">
              <a className="contact-link" href="#">
                Contact
              </a>
              <div className="contact-popup">
                NETFLIX MOVIES LLC
                <br />
                24 Kinoshna St., Kyiv, Ukraine, 02000
                <br />
                Phone: +380 (44) 987-65-43
                <br />
                Email: contact@netflixmoviesllc.com
              </div>
            </div>
            <Link className="footer-pages" to="/privacy">
              Privacy
            </Link>
            <Link className="footer-pages" to="/terms">
              Terms
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 MovieApp. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
