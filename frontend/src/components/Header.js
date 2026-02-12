import { useEffect, useState } from "react";

const images = [
  "/slider/1.png",
  "/slider/2.jpg",
  "/slider/3.png",
  "/slider/4.png",
  "/slider/5.png",
];

const shopName = "तेजू पान एवं फूल भंडार";

function Header() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");

  // SLIDER
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // TYPEWRITER
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTyped(shopName.slice(0, i));
      i++;
      if (i > shopName.length) clearInterval(typing);
    }, 80);

    return () => clearInterval(typing);
  }, []);

  return (
    <div className="hero">

      {/* SLIDES */}
      <div
        className="hero-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <img key={i} src={img} alt="" />
        ))}
      </div>

      {/* TEXT */}
      <div className="hero-content">

        {/* SHOP NAME */}
        <h1 className="typewriter">{typed}</h1>

        {/* TAGLINE */}
        <p className="hero-tagline">आपका हर कार्यक्रम बने यादगार</p>

        {/* SMALL INTRO */}
        <p className="hero-small">
          विवाह, जयमाल, तिलक, मड़वा, पंडाल, लाइटिंग,
          कैमरा व सम्पूर्ण सजावट की सुविधा एक ही स्थान पर।
        </p>

        <div className="btn-row">
          <a href="tel:9044231865" className="btn btn-green">
            📞 Call
          </a>

          <a
            href="https://wa.me/919044231865"
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>

      {/* ARROWS */}
      <button className="hero-arrow left" onClick={() => setIndex(index - 1 < 0 ? images.length - 1 : index - 1)}>
        ◀
      </button>

      <button className="hero-arrow right" onClick={() => setIndex((index + 1) % images.length)}>
        ▶
      </button>

    </div>
  );
}

export default Header;
