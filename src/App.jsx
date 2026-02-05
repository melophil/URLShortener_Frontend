import { useState, useContext } from "react";
import "./App.css";
import Header from "./components/Header";
import UrlShortener from "./components/UrlShortener";
import TrendingList from "./components/TrendingList";
import Toast from "./components/Toast";
import AuthForm from "./components/AuthForm";
import { AuthContext } from "./context/AuthContext";
import MyLinks from "./components/MyLinks";

function App() {
  const { token, logout } = useContext(AuthContext); // 🔐 auth state
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  };

  return (
    <div className="app-container">
      <Header />

      {/* 🔐 Show logout if logged in */}
      {token && (
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <button onClick={logout}>Logout</button>
        </div>
      )}

      {/* 🔄 Conditional Rendering */}
      {token ? (
        <>
          <UrlShortener showToast={showToast} />
          <MyLinks />
          <TrendingList />
        </>
      ) : (
        <AuthForm />
      )}

      <Toast message={toastMsg} />
    </div>
  );
}

export default App;
