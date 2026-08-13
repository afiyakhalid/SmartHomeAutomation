import { useState } from "react";
import api from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      alert("User created successfully");
      nav("/login");

    } catch (err) {
      console.log(err.response?.data);
      alert("Register failed");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Sign Up</h2>

      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Register</button>
    </form>
  );
}