import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TEMP LOGIN
    if (username === "admin" && password === "1234") {
      navigate("/admin/dashboard");
    } else {
      alert("गलत username या password");
    }
  };

  return (
    <div className="container center" style={{ marginTop: "80px" }}>
      <h2>Admin Login</h2>

      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ padding: "10px", width: "250px", marginBottom: "10px" }}
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: "10px", width: "250px" }}
        />
      </div>

      <div style={{ marginTop: "15px" }}>
        <button className="btn btn-green" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
