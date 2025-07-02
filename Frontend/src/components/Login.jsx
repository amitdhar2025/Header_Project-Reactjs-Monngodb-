import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider.jsx";

function Login() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:4002/user/login", {
        email,
        password,
      });
      if (response.data.message === "Login successful") {
        // Save token or user info as needed
        // Save authUser in context and localStorage
        setAuthUser(response.data.user);
        localStorage.setItem("Users", JSON.stringify(response.data.user));
        // Redirect to /admin after login
        navigate("/admin");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow-md bg-white dark:bg-slate-800 dark:text-white" style={{ marginTop: "5rem" }}>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      
    </div>
  );
}

export default Login;
