import React, { useState } from "react";

export default function TweetForm({ onTweetPosted }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/tweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      if (response.ok) {
        setContent("");
        onTweetPosted(data);
      } else {
        alert(data.error || "Failed to post tweet");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tweet-form">
      <textarea
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Tweet</button>
    </form>
  );
}
