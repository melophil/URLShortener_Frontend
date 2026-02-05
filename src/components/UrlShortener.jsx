import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API_BASE = "http://localhost:5000";

export default function UrlShortener({ showToast }) {
  const { token } = useContext(AuthContext); // ✅ get token

  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shortenUrl = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) {
        setError("You must be logged in to shorten URLs");
        return;
      }

      const res = await fetch(`${API_BASE}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // ✅ send token
        },
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
