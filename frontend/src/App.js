import AddImage from "./admin/AddImage";
import "./styles/main.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Gallery from "./Gallery";
import Header from "./components/Header";
import Footer from "./components/Footer";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery/:id" element={<Gallery />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AddImage />} />

      </Routes>

      <Footer />

       {/* WhatsApp Floating */}
           <a
             href="https://wa.me/919044231865"
             target="_blank"
             rel="noreferrer"
             className="floating-whatsapp"
           >
             💬
           </a>

    </BrowserRouter>
  );
}

export default App;
