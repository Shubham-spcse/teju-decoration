import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:8080";

function Gallery() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/gallery/${id}`)
      .then(res => res.json())
      .then(data => setImages(data));
  }, [id]);

  return (
    <div className="container">

      {/* 🔙 BACK BUTTON */}
      <button
        className="btn btn-green"
        style={{ marginBottom: "15px" }}
        onClick={() => navigate(-1)}
      >
        ⬅ वापस जाएँ
      </button>

      <h2 className="section-title">Design Gallery</h2>

      {/* GRID */}
      <div className="grid grid-200">
        {images.map(img => (
          <div
            key={img.id}
            className="glass-card"
            onClick={() => setSelectedImage(img)}
          >
            {/* BADGE */}
            {img.tag && (
              <div className={`badge badge-${img.tag.toLowerCase()}`}>
                {img.tag}
              </div>
            )}

            {/* IMAGE */}
            <div className="image-box">
              <img src={`${API}${img.imageUrl}`} alt="" />
            </div>

            {/* INFO */}
            <div className="mt-10 bold">
              Design No: {img.photoNumber}
            </div>

            {img.description && (
              <div className="mt-5">{img.description}</div>
            )}

            {img.price && (
              <div className="mt-5 price">{img.price}</div>
            )}
          </div>
        ))}
      </div>

      {/* POPUP */}
      {selectedImage && (
        <div
          className="popup-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="glass-card popup"
            onClick={e => e.stopPropagation()}
          >
            {selectedImage.tag && (
              <div className={`badge badge-${selectedImage.tag.toLowerCase()}`}>
                {selectedImage.tag}
              </div>
            )}

            <div className="image-box">
              <img src={`${API}${selectedImage.imageUrl}`} alt="" />
            </div>

            <div className="mt-10 bold">
              Design No: {selectedImage.photoNumber}
            </div>

            {selectedImage.description && (
              <div className="mt-5">{selectedImage.description}</div>
            )}

            {selectedImage.price && (
              <div className="mt-5 price">{selectedImage.price}</div>
            )}

            <a
              href={`https://wa.me/919044231865?text=${encodeURIComponent(
                `नमस्ते, मुझे Design No ${selectedImage.photoNumber} बुक करना है।`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp full mt-10"
            >
              💬 इस डिजाइन के लिए WhatsApp करें
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
