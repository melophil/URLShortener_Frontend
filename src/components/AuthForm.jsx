import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API_BASE = "http://localhost:5000/auth";

export default function AuthForm() {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);


  const handleSubmit = async () => {
    try {
      setError("");
      const res = await fetch(`${API_BASE}/${isLogin ? "login" : "signup"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      login(data.token,remember);
    } catch (err) {
      setError(err.message || "Auth failed");
    }
  };

  return (
    <div className="card">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

      <button onClick={handleSubmit}>{isLogin ? "Login" : "Sign Up"}</button>

      {error && <p className="error">{error}</p>}

      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "#4f46e5" }}>
        {isLogin ? "No account? Sign up" : "Already have an account? Login"}
      </p>
      <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
  <input
    type="checkbox"
    checked={remember}
    onChange={(e) => setRemember(e.target.checked)}
  />
  Remember me
</label>

    </div>
  );
}
