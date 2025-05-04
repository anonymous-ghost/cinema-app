import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Home from "./Pages/Home";
import AdminPanel from "./Pages/AdminPanel";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;