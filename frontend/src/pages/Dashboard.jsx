import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getStats } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then((res) => setStats(res.data)).catch(console.error);
  }, []);

  if (!stats) return <div className="card">Loading dashboard analytics...</div>;

  return (
    <div>
      <div className="kpi-row">
        <div className="card kpi"><h3>{stats.total_flights.toLocaleString()}</h3><p>Total Flights</p></div>
        <div className="card kpi"><h3>{stats.overall_delay_rate}%</h3><p>Overall Delay Rate</p></div>
      </div>

      <div className="card">
        <h3>Delay Rate by Departure Hour (%)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={stats.by_hour}>
            <XAxis dataKey="hour" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="delay_rate" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3>Delay Rate by Weather (%)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={stats.by_weather}>
            <XAxis dataKey="weather" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="delay_rate" fill="#ea580c" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3>Delay Rate by Airline (%)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={stats.by_airline}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="delay_rate" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}