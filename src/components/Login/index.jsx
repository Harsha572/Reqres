import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/users");
    }
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { email, password };
    const url = "https://reqres.in/api/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/users");
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-head">Login</h1>
        <form className="form" onSubmit={submitForm}>
          <label htmlFor="mailid" className="label">Email ID</label>
          <input id="mailid" className="inputtext" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="pwd" className="label">Password</label>
          <input id="pwd" className="inputtext" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="login-button" type="submit">Login</button>
          {isError && <p className="error">Invalid Credentials</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
