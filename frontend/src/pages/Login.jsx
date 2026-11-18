import { useState } from "react";
import { loginUser, registerUser } from "../services/api";

export default function Login({ onAuth }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = isRegister ? await registerUser(form) : await loginUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      onAuth(res.data.username);
    } catch (err) {
      setError(err.response?.data?.error || "Authentication failed");
    }
  };

  return (
    <div className="card" style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>{isRegister ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">{isRegister ? "Create Account" : "Login"}</button>
      </form>
      <p style={{ marginTop: 12 }}>
        {isRegister ? "Already have an account?" : "New user?"}{" "}
        <button type="button" className="link-btn" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}