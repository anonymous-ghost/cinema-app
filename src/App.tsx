import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Home from "./Pages/Home";
import AdminPanel from "./Pages/AdminPanel";
import Favorites from "./Pages/Favorites";
import { FilmsProvider } from "./contexts/FilmsContext";

const App = () => {
  return (
    <FilmsProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </FilmsProvider>
  );
};
export default App;