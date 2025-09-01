import React, { useState } from "react";
import { ethers } from "ethers";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./Dashboard.css";

export default function Dashboard({ user }) {
  const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz");

  const twitterUsername = user?.twitter?.username;
  const twitterName = user?.twitter?.name;
  const twitterProfilePicture = user?.twitter?.profilePictureUrl;

  const data = [
    { day: "Mon", impressions: 320, clicks: 45, engagementRate: 12 },
    { day: "Tue", impressions: 410, clicks: 60, engagementRate: 14 },
    { day: "Wed", impressions: 380, clicks: 52, engagementRate: 13 },
    { day: "Thu", impressions: 500, clicks: 70, engagementRate: 15 },
    { day: "Fri", impressions: 460, clicks: 66, engagementRate: 14 },
    { day: "Sat", impressions: 520, clicks: 80, engagementRate: 16 },
    { day: "Sun", impressions: 600, clicks: 95, engagementRate: 18 },
  ];

  const metrics = [
    { key: "impressions", label: "Impressions", color: "rgba(58,124,255,1)" },
    { key: "clicks", label: "Clicks", color: "rgba(217,0,255,1)" },
    { key: "engagementRate", label: "Engagement Rate", color: "rgba(0,255,128,1)" },
  ];

  const [toggles, setToggles] = useState({
    notifyAddedList: true,
    smsTrending: false,
    getRecommended: true,
    allowKeywords: false,
  });

  const [metric1, setMetric1] = useState(metrics[0].key);
  const [metric2, setMetric2] = useState(metrics[1].key);

  const toggle = (key) => setToggles((p) => ({ ...p, [key]: !p[key] }));

  const getMetric = (key) => metrics.find((m) => m.key === key);

  return (
    <div className="dashboard">
      {/* user info */}
      <div className="user-info">
        {twitterProfilePicture && (
          <img src={twitterProfilePicture} alt="profile" className="profile-picture" />
        )}
        {twitterName && <h3>{twitterName}</h3>}
        {twitterUsername && <p>@{twitterUsername}</p>}
      </div>

{/* metric selectors */}
<section className="dash-card metric-selectors">
  {[
    { key: metric1, set: setMetric1 },
    { key: metric2, set: setMetric2 },
  ].map(({ key, set }, i) => {
    const metric = getMetric(key);
    return (
      <div className="metric-select" key={i}>
        <div className="metric-label">
          <span
            className="color-swatch"
            style={{ backgroundColor: metric.color }}
          ></span>
          {metric.label}
        </div>
        <select value={key} onChange={(e) => set(e.target.value)}>
          {metrics.map((m) => (
            <option key={m.key} value={m.key}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
    );
  })}
</section>


      {/* chart */}
      <section className="dash-card chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis dataKey="day" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
              }}
            />
            <Bar dataKey={metric1} fill={getMetric(metric1).color} />
            <Bar dataKey={metric2} fill={getMetric(metric2).color} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* preferences */}
      <div className="prefs">
        {Object.entries({
          notifyAddedList: "Get notifications for added list",
          smsTrending: "Get SMS for trending posts",
          getRecommended: "Get recommended to others",
          allowKeywords: "Add keywords for recommendations",
        }).map(([key, label]) => (
          <section className="dash-card toggle-item" key={key}>
            <span>{label}</span>
            <label className="switch">
              <input type="checkbox" checked={toggles[key]} onChange={() => toggle(key)} />
              <span className="slider"></span>
            </label>
          </section>
        ))}
      </div>
    </div>
  );
}
