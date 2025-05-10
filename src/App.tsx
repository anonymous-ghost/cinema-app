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
import { Toaster } from "@/components/ui/Toaster";

const App = () => {
  return (
  <Router>
    <FilmsProvider>
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
      </Routes>

      <Footer />
      <Toaster />
    </FilmsProvider>
  </Router>
  );
};

export default App;
