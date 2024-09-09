import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.scss'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const authUser = async (email, password) => {
    try {
      const response = await axios.post(
        "https://alpha-one-server.vercel.app/api/v1/checkUser",
        { email, password }
      );
      console.log(response);
      return response.data; // Return response data
    } catch (error) {
      console.error("Error during authentication:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authResponse = await authUser(email, password);

    if (authResponse && authResponse.success) {
      login(); // Set user as authenticated
      navigate("/admin/dashboard"); // Redirect to dashboard after login
    } else {
      alert("Authentication failed. Please check your email and password.");
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    fontFamily: "Arial, sans-serif",
    backgroundImage:"./GailBackground2.jpeg"
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  };

  const headingStyle = {
    marginBottom: "20px",
    color: "#333",
    fontSize: "300%",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "2px",
    margin: "0 0 20px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle }>
      <h2 style={headingStyle}>GAIL INDIA ADMIN DASHBOARD</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
