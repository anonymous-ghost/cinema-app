import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/MoviePage.css";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Home from "./Pages/Home";
import AdminPanel from "./Pages/AdminPanel";
import Favorites from "./Pages/Favorites";
import Sessions from "./Pages/Sessions";
import FAQ from "./Pages/FAQ";
import Privacy from "./Pages/Privacy";
import Terms from "./Pages/Terms";
import MoviePage from "@/Pages/MoviePage";
import { FilmsProvider } from './contexts/FilmsContext';
import { SessionsProvider } from './contexts/SessionsContext';
import { AuthProvider } from './contexts/AuthContext';
import { BookingsProvider } from './contexts/BookingsContext';
import { Toaster } from "@/components/ui/Toaster";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Bookings from "./Pages/Bookings";
import Checkout from "./Pages/Checkout";

const App = () => {
  return (
  <Router>
    <AuthProvider>
      <FilmsProvider>
        <SessionsProvider>
          <BookingsProvider>
            <Header />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/movie/:id" element={<MoviePage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/checkout/:sessionId" element={<Checkout />} />
            </Routes>

            <Footer />
            <Toaster />
          </BookingsProvider>
        </SessionsProvider>
      </FilmsProvider>
    </AuthProvider>
  </Router>
  );
};

export default App;
