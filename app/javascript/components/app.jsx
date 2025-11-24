import React, { useState, useEffect } from "react";
// import AppNavbar from "./AppNavbar";
import LoginSignup from "./LoginSignup";
import Feed from "./Feed";
import TweetForm from "./TweetForm";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    await fetch("/sessions", { method: "DELETE" });
    setUser(null);
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // adjust the URL if your Rails app exposes a different endpoint (e.g. '/sessions' or '/me')
        const res = await fetch("/authenticated", {
          method: "GET",
          headers: { "Accept": "application/json" },
          credentials: "same-origin",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data) setUser(data);
      } catch (err) {
        console.warn("Failed to fetch current user:", err);
      }
    };

    fetchCurrentUser();
  }, []);

  console.log("Current user:", user);
  return (
    <div className="app-container">
      {/* <AppNavbar /> */}
      <div className="container mt-5 pt-5">
        {!user ? (
          <LoginSignup onAuthSuccess={setUser} />
        ) : (
          <>
            <header className="mb-4">
              <h1>🐦 Twitter Clone</h1>
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </header>
            <TweetForm onTweetPosted={() => window.location.reload()} />
            <Feed />
          </>
        )}
      </div>
    </div>
  );
}
