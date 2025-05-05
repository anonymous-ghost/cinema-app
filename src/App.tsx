import "./App.css";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FAQ from "./Pages/FAQ";
import Privacy from "./Pages/Privacy";
import Terms from "./Pages/Terms";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
