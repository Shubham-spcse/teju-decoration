import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";

function Footer() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);
  const [tapCount, setTapCount] = useState(0);

  const toggle = (section) => {
    setOpen(open === section ? null : section);
  };

  // SECRET ADMIN ENTRY
  const handleSecretClick = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (newCount === 5) {
      navigate("/admin");
      setTapCount(0);
    }

    setTimeout(() => setTapCount(0), 2000);
  };

  return (
    <div className="footer">
      <div className="footer-inner">

        {/* LEFT */}
        <div className="footer-section">
          <div className="footer-heading" onClick={() => toggle("owner")}>
            मालिक की जानकारी
            <span className={`arrow ${open === "owner" ? "rotate" : ""}`}>⌄</span>
          </div>

          <div className={`footer-content ${open === "owner" ? "show" : ""}`}>
            <div className="owner">
              <img
                src="/owners/chacha.jpg"
                alt=""
                onClick={handleSecretClick}
              />
              <div>
                <div className="bold">Teju Prajapati</div>
                <div>📞 9044231865</div>
                <div>व्यवस्था एवं प्रबंधन</div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER */}
        <div className="footer-section">
          <div className="footer-heading" onClick={() => toggle("links")}>
            Quick Links
            <span className={`arrow ${open === "links" ? "rotate" : ""}`}>⌄</span>
          </div>

          <div className={`footer-content ${open === "links" ? "show" : ""}`}>
            <div onClick={() => navigate("/")}>Home</div>
            <div onClick={() => navigate("/gallery/7")}>जयमाल</div>
            <div>गाड़ी सजावट</div>
            <div>मंडप</div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="footer-section">
          <div className="footer-heading" onClick={() => toggle("contact")}>
            संपर्क
            <span className={`arrow ${open === "contact" ? "rotate" : ""}`}>⌄</span>
          </div>

          <div className={`footer-content ${open === "contact" ? "show" : ""}`}>
            <div>📞 9565659374</div>
            <div>मुख्य सजावट विशेषज्ञ</div>
            <div>Dak Bangla Gate, Barhaj</div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Teju Pan avam Phool Bhandar
      </div>
    </div>
  );
}

export default Footer;
