import React, { useEffect, useState } from "react";

export default function Feed() {
  const [tweets, setTweets] = useState([]);

  const fetchTweets = async () => {
    try {
      const response = await fetch("/tweets");
      const data = await response.json();
      if (response.ok) {
        setTweets(data.tweets || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTweet = async (id) => {
    if (!window.confirm("Delete this tweet?")) return;
    try {
      await fetch(`/tweets/${id}`, { method: "DELETE" });
      setTweets((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
  <div className="feed">
    <h2>Latest Tweets</h2>

    {tweets.map((tweet) => (
      <div key={tweet.id} className="card mb-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h6
              className="text-primary mb-1"
              style={{ cursor: "pointer" }}
              onClick={() => (window.location.href = `/${tweet.username}`)}
            >
              @{tweet.username}
            </h6>
            <p className="mb-0">{tweet.content}</p>
          </div>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => deleteTweet(tweet.id)}
          >
            🗑
          </button>
        </div>
      </div>
    ))}
  </div>
);}
