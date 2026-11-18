import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import About from "./pages/About";
import Login from "./pages/Login";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("predict");
  const [user, setUser] = useState(localStorage.getItem("username") || "");

  const logout = () => {
    localStorage.clear();
    setUser("");
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h1>Flight Delay Predictor</h1>
        <div className="nav-links">
          <button onClick={() => setPage("predict")}>Predict</button>
          <button onClick={() => setPage("dashboard")}>Dashboard</button>
          <button onClick={() => setPage("about")}>About</button>
          {user ? (
            <button onClick={logout}>Logout ({user})</button>
          ) : (
            <button onClick={() => setPage("login")}>Login</button>
          )}
        </div>
      </nav>

      <main className="container">
        {page === "predict" && <Predict />}
        {page === "dashboard" && <Dashboard />}
        {page === "about" && <About />}
        {page === "login" && <Login onAuth={(u) => { setUser(u); setPage("predict"); }} />}
      </main>
    </div>
  );
}