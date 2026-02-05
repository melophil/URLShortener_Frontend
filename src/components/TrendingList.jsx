import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000";

export default function TrendingList() {
  const [trending, setTrending] = useState([]);

  const loadTrending = async () => {
    const res = await fetch(API_BASE + "/analytics/top");
    const data = await res.json();
    setTrending(data);
  };

  useEffect(() => {
    loadTrending();
    const interval = setInterval(loadTrending, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <h2>🔥 Trending Links</h2>
      <ul className="trending-list">
        {trending.length === 0 ? (
          <p>No trending links yet</p>
        ) : (
          trending.map((item, i) => (
            <li key={i} className="trending-item">
              <span>{item.shortCode}</span>
              <span>{item.clicks} clicks</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
