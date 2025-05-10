import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/MoviePage.css";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import Favorites from "./pages/Favorites";
import Sessions from "./pages/Sessions";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import MoviePage from "@/pages/MoviePage";
import { FilmsProvider } from "./contexts/FilmsContext";
import { Toaster } from "@/components/ui/Toaster";

const App = () => {
  return (
    <FilmsProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </FilmsProvider>
  );
};

export default App;
