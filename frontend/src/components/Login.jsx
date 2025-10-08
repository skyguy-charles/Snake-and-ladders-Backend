import React, { useState } from "react";
import api from "../api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { username, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      } else {
        setError("Login failed: No token returned");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed: Invalid credentials or server error");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;





































































