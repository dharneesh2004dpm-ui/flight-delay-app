import { useState } from "react";
import { predictDelay } from "../services/api";

const AIRLINES = ["IndiGo", "Air India", "Vistara", "SpiceJet", "Akasa Air", "Air India Express", "Alliance Air", "Star Air", "Fly91"];
const AIRPORTS = ["BOM", "DEL", "BLR", "MAA", "HYD", "CCU", "AMD", "COK", "PNQ", "GOI"];

export default function Predict() {
  const [form, setForm] = useState({
    airline: "IndiGo",
    origin: "BOM",
    destination: "DEL",
    date: "2026-11-20",
    dep_hour: 8,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await predictDelay(form);
      setResult(res.data);
    } catch {
      alert("Prediction failed! Check if Django server is running.");
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Predict Flight Delay Risk</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>Airline
          <select value={form.airline} onChange={(e) => setForm({ ...form, airline: e.target.value })}>
            {AIRLINES.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </label>
        <label>Origin Airport
          <select value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })}>
            {AIRPORTS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </label>
        <label>Destination Airport
          <select value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })}>
            {AIRPORTS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </label>
        <label>Flight Date
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        </label>
        <label>Departure Hour (0 - 23)
          <input type="number" min="0" max="23" value={form.dep_hour} onChange={(e) => setForm({ ...form, dep_hour: e.target.value })} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Predicting..." : "Predict Delay"}</button>
      </form>

      {result && (
        <div className={`result-box risk-${result.risk_label.toLowerCase()}`}>
          <h3>Delay Risk: {result.delay_probability}%</h3>
          <p>Risk Level: <strong>{result.risk_label}</strong></p>
        </div>
      )}
    </div>
  );
}