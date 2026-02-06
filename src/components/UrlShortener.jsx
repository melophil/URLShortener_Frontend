import { useState } from "react";

const API_BASE = "http://localhost:5000";

export default function UrlShortener({ showToast }) {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shortenUrl = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // ⭐ send HTTP-only cookie automatically
        body: JSON.stringify({ longUrl })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setShortUrl(data.shortUrl);
      showToast("Short URL created 🎉");
    } catch (err) {
      setError(err.message || "Invalid or failed URL");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    showToast("Copied to clipboard 📋");
  };

  return (
    <div className="card">
      <div className="input-row">
        <input
          type="text"
          placeholder="Paste your long URL here..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button onClick={shortenUrl} disabled={loading}>
          {loading ? "Shortening..." : "Shorten"}
          {loading && <span className="spinner"></span>}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {shortUrl && (
        <div className="result-box">
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
          <button className="copy-btn" onClick={copyToClipboard}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
