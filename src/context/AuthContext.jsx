import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const API_BASE = "http://localhost:5000";

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check session on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          credentials: "include"
        });

        if (res.ok) setAuthenticated(true);
        else setAuthenticated(false);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include"
    });
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
