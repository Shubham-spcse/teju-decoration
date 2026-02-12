import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8080";

function Home() {
  const [categories, setCategories] = useState([]);
  const [popular, setPopular] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // categories
    fetch(`${API}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data));

    // popular images
    fetch(`${API}/api/gallery/all`)
      .then(res => res.json())
      .then(data => setPopular(data.slice(0, 4))); // top 4
  }, []);

  return (
    <div className="container">

      {/* SERVICES */}
      <h2 className="section-title" data-aos="fade-right">
        हमारी सेवाएँ
      </h2>

      {/* CATEGORY GRID */}
      <div className="grid grid-200">
        {categories.map(cat => (
          <div
            key={cat.id}
            className="glass-card center bold"
            data-aos="zoom-in"
            onClick={() => navigate(`/gallery/${cat.id}`)}
          >
            {cat.name}
          </div>
        ))}
      </div>

      {/* WHY CHOOSE US */}
      <div className="mt-60">
        <h2 className="section-title" data-aos="fade-right">
          हमारी विशेषताएँ
        </h2>

        <div className="grid grid-200">
          {[
            "अनुभवी टीम",
            "समय पर सजावट",
            "आधुनिक डिज़ाइन",
            "बजट में बेहतरीन काम"
          ].map((item, i) => (
            <div key={i} className="glass-card bold" data-aos="fade-up">
              ✔ {item}
            </div>
          ))}
        </div>
      </div>

      {/* POPULAR DESIGNS */}
      <div className="mt-60">
        <h2 className="section-title" data-aos="fade-right">
          हमारे लोकप्रिय डिजाइन
        </h2>

        <div className="grid grid-250">
          {popular.map(img => (
            <div
              key={img.id}
              className="image-box"
              data-aos="fade-up"
              onClick={() => navigate(`/gallery/${img.category?.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img src={`${API}${img.imageUrl}`} alt="" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta" data-aos="zoom-in">
        <h2>अपनी पसंद का डिजाइन चुनें और तुरंत बुकिंग करें!</h2>

        <div className="btn-row">
          <a href="tel:9044231865" className="btn btn-green">
            📞 कॉल करें
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

    </div>
  );
}

export default Home;
