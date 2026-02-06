import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API_BASE = "http://localhost:5000/auth";

export default function AuthForm() {
  const { setAuthenticated } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setError("");

      const res = await fetch(`${API_BASE}/${isLogin ? "login" : "signup"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (isLogin) {
        setAuthenticated(true);  // login → show dashboard
      } else {
        setIsLogin(true);        // signup → switch to login screen
      }
    } catch (err) {
      setError(err.message || "Auth failed");
    }
  };

  return (
    <div className="card">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

      <button onClick={handleSubmit}>
        {isLogin ? "Login" : "Sign Up"}
      </button>

      {error && <p className="error">{error}</p>}

      <p
        onClick={() => setIsLogin(!isLogin)}
        style={{ cursor: "pointer", color: "#4f46e5" }}
      >
        {isLogin ? "No account? Sign up" : "Already have an account? Login"}
      </p>
    </div>
  );
}
