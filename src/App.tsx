import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/MoviePage.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Sessions from "./pages/Sessions";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import MoviePage from "@/pages/MoviePage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
