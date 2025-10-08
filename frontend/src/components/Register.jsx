import React, { useState } from "react";
import api from "../api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", { username, password });
      if (res.data.message) {
        setSuccess("Registration successful! You can now log in.");
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;




































































































