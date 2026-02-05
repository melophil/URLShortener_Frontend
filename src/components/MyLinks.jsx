import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API_BASE = "http://localhost:5000";

export default function MyLinks() {
  const { token } = useContext(AuthContext);
  const [links, setLinks] = useState([]);

  useEffect(() => {
  const fetchLinks = async () => {
    const res = await fetch(`${API_BASE}/my-links`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    console.log("My Links API response:", data);

    if (Array.isArray(data)) {
      setLinks(data);
    } else {
      setLinks([]);
      console.error("Unexpected response:", data);
    }
  };

  if (token) fetchLinks();
}, [token]);


  return (
    <div className="card">
      <h2>📁 My Links</h2>

      {links.length === 0 ? (
        <p>You haven't created any links yet.</p>
      ) : (
        <ul className="trending-list">
          {links.map((link) => (
            <li key={link.shortCode} className="trending-item">
              <span>{link.shortCode}</span>
              <span>{link.clicks} clicks</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
