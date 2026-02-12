import { useState } from "react";

function AddImage() {
  const [form, setForm] = useState({
    imageUrl: "",
    photoNumber: "",
    description: "",
    price: "",
    categoryId: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch("http://localhost:8080/api/admin/add-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(() => {
        alert("Image Added ✅");
      })
      .catch(() => alert("Error ❌"));
  };

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h2>Add New Design</h2>

      <div className="mt-10">
        <input name="imageUrl" placeholder="Image URL" onChange={handleChange} />
      </div>

      <div className="mt-10">
        <input name="photoNumber" placeholder="Design Number" onChange={handleChange} />
      </div>

      <div className="mt-10">
        <input name="description" placeholder="Description" onChange={handleChange} />
      </div>

      <div className="mt-10">
        <input name="price" placeholder="Price" onChange={handleChange} />
      </div>

      <div className="mt-10">
        <input name="categoryId" placeholder="Category ID" onChange={handleChange} />
      </div>

      <div className="mt-10">
        <button className="btn btn-green" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}

export default AddImage;
