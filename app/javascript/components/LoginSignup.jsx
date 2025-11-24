import React, { useState } from "react";

export default function LoginSignup({ onAuthSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || "";
    if (!token) console.warn("CSRF token not found in meta tags");

    const response = await fetch("/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
        "Accept": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      onAuthSuccess(data.user);
    } else {
      // handle error (optional)
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="form-control mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
      <div className="col-md-6">
        <h3>Signup</h3>
        <p>(Signup form placeholder)</p>
      </div>
    </div>
  );
}
