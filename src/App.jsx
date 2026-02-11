import { useState, useContext } from "react";
import "./App.css";
import Header from "./components/Header";
import UrlShortener from "./components/UrlShortener";
import TrendingList from "./components/TrendingList";
import Toast from "./components/Toast";
import AuthForm from "./components/AuthForm";
import { AuthContext } from "./context/AuthContext";
import MyLinks from "./components/MyLinks";
import Layout from "./components/Layout";

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext); // ⭐ correct state
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  };

  return (
    <div className="app-container">
      <Header />

      {isAuthenticated && (
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <button onClick={logout}>Logout</button>
        </div>
      )}

      {isAuthenticated ? (
        <Layout>
          <UrlShortener showToast={showToast} />
          <MyLinks />
          <TrendingList />
         </Layout>
      ) : (
        <AuthForm />
      )}

      <Toast message={toastMsg} />
    </div>
  );
}

export default App;
