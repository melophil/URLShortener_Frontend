import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    sessionStorage.getItem("token") || localStorage.getItem("token")
  );

  const login = (newToken, remember = false) => {
    if (remember) {
      localStorage.setItem("token", newToken);
    } else {
      sessionStorage.setItem("token", newToken);
    }
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setToken(null);
  };

  // 🔄 Auto logout when token expires
  useEffect(() => {
    if (!token) return;

    try {
      const { exp } = jwtDecode(token);
      const expiryTime = exp * 1000 - Date.now();

      if (expiryTime <= 0) {
        logout();
      } else {
        const timer = setTimeout(logout, expiryTime);
        return () => clearTimeout(timer);
      }
    } catch {
      logout();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
