import { useEffect, useState } from "react";
import "./admin.css";

const API = "http://localhost:8080";

function AdminDashboard() {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // ADD NEW
  const [file, setFile] = useState(null);
  const [photoNumber, setPhotoNumber] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const loadImages = () => {
    fetch(`${API}/api/gallery/all`)
      .then(res => res.json())
      .then(data => setImages(data));
  };

  useEffect(() => {
    loadImages();

    fetch(`${API}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  // ================= DELETE =================
  const handleDelete = (id) => {
    if (!window.confirm("Delete this design?")) return;

    fetch(`${API}/api/admin/image/${id}`, { method: "DELETE" })
      .then(res => res.text())
      .then(msg => {
        alert(msg || "Deleted");
        loadImages();
      });
  };

  // ================= ADD =================
  const uploadImage = () => {
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("photoNumber", photoNumber);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("tag", tag);
    formData.append("categoryId", categoryId);

    fetch(`${API}/api/admin/upload`, {
      method: "POST",
      body: formData
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        loadImages();

        // reset
        setFile(null);
        setPhotoNumber("");
        setDescription("");
        setPrice("");
        setTag("");
        setCategoryId("");
      });
  };

  // ================= EDIT =================
  const startEdit = (img) => {
    setEditingId(img.id);
    setEditData({
      photoNumber: img.photoNumber || "",
      description: img.description || "",
      price: img.price || "",
      tag: img.tag || "",
      categoryId: img.category?.id || ""
    });
  };

  const saveEdit = () => {
    const formData = new FormData();
    Object.keys(editData).forEach(key => {
      formData.append(key, editData[key]);
    });

    fetch(`${API}/api/admin/update/${editingId}`, {
      method: "PUT",
      body: formData
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        setEditingId(null);
        loadImages();
      });
  };

  return (
    <div className="admin-container">
      <h2>⚙ Admin Dashboard</h2>

      {/* ================= ADD NEW ================= */}
      <div className="admin-add">
        <h3>➕ Add New Design</h3>

        <input type="file" onChange={e => setFile(e.target.files[0])} />

        <input
          placeholder="Photo Number"
          value={photoNumber}
          onChange={e => setPhotoNumber(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        {/* TAG */}
        <select value={tag} onChange={e => setTag(e.target.value)}>
          <option value="">Select Tag</option>
          <option value="POPULAR">POPULAR</option>
          <option value="TRENDING">TRENDING</option>
          <option value="NEW">NEW</option>
          <option value="PREMIUM">PREMIUM</option>
        </select>

        {/* CATEGORY */}
        <select
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button onClick={uploadImage}>Upload 🚀</button>
      </div>

      {/* ================= LIST ================= */}
      <div className="admin-grid">
        {images.map(img => (
          <div key={img.id} className="admin-card">

            {editingId === img.id ? (
              <>
                <input
                  value={editData.photoNumber}
                  onChange={e => setEditData({ ...editData, photoNumber: e.target.value })}
                />

                <input
                  value={editData.description}
                  onChange={e => setEditData({ ...editData, description: e.target.value })}
                />

                <input
                  value={editData.price}
                  onChange={e => setEditData({ ...editData, price: e.target.value })}
                />

                <select
                  value={editData.tag}
                  onChange={e => setEditData({ ...editData, tag: e.target.value })}
                >
                  <option value="">Select Tag</option>
                  <option value="POPULAR">POPULAR</option>
                  <option value="TRENDING">TRENDING</option>
                  <option value="NEW">NEW</option>
                  <option value="PREMIUM">PREMIUM</option>
                </select>

                <select
                  value={editData.categoryId}
                  onChange={e => setEditData({ ...editData, categoryId: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <button onClick={saveEdit}>💾 Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <img src={`${API}${img.imageUrl}`} alt="" />
                <div className="bold">{img.photoNumber}</div>

                <button onClick={() => startEdit(img)}>✏ Edit</button>
                <button onClick={() => handleDelete(img.id)}>🗑 Delete</button>
              </>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
