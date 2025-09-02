import React, { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import LoginButton from "../components/LoginButton2";
import LogoutButton from "../components/LogoutButton";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";


import "./Dashboard.css";

const fakeServerData = {
  toggles: {
    notifyAddedList: true,
    smsTrending: false,
    getRecommended: true,
    allowKeywords: true,
  },
  keywords: ["gaming", "tech", "crypto"],
};

const metrics = [
  { key: "impressions", label: "Earnings", color: "rgba(0, 255, 64, 1)" },
  { key: "clicks", label: "Impressions", color: "rgba(5, 147, 255, 1)" },
  { key: "engagementRate", label: "Engagement Rate", color: "rgba(255, 200, 0, 1)" },
];

const data = [
  { day: "Mon", impressions: 320, clicks: 45, engagementRate: 12 },
  { day: "Tue", impressions: 410, clicks: 60, engagementRate: 14 },
  { day: "Wed", impressions: 380, clicks: 52, engagementRate: 13 },
  { day: "Thu", impressions: 500, clicks: 70, engagementRate: 15 },
  { day: "Fri", impressions: 460, clicks: 66, engagementRate: 14 },
  { day: "Sat", impressions: 520, clicks: 80, engagementRate: 16 },
  { day: "Sun", impressions: 600, clicks: 95, engagementRate: 18 },
];

/* ------------ subcomponents ---------------- */

function UserCard({ name, username, avatar }) {
  return (
    <div className="user-info">
      {avatar && <img src={avatar} alt="profile" className="profile-picture" />}
      {name && <h3>{name}</h3>}
      {username && <p>@{username}</p>}
    </div>
  );
}

function MetricSelectors({ metric1, metric2, setMetric1, setMetric2 }) {
  const getMetric = (key) => metrics.find((m) => m.key === key);

  return (
    <section className="dash-card metric-selectors">
      {[{ key: metric1, set: setMetric1 }, { key: metric2, set: setMetric2 }].map(
        ({ key, set }, i) => {
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
        }
      )}
    </section>
  );
}

function MetricsChart({ metric1, metric2 }) {
  const getMetric = (key) => metrics.find((m) => m.key === key);

  return (
    <section className="dash-card chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
          <Line
            type="monotone"
            dataKey={metric1}
            stroke={getMetric(metric1).color}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey={metric2}
            stroke={getMetric(metric2).color}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

function PrefsPanel({ toggles, toggle, keywords, setKeywords }) {
  const [newKeyword, setNewKeyword] = useState("");

  return (
    <div className="prefs">
      <section className="dash-card toggle-item">
        <span>Get notifications for added list</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={toggles.notifyAddedList}
            onChange={() => toggle("notifyAddedList")}
          />
          <span className="slider"></span>
        </label>
      </section>

      <section className="dash-card toggle-item">
        <span>Get SMS for trending posts</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={toggles.smsTrending}
            onChange={() => toggle("smsTrending")}
          />
          <span className="slider"></span>
        </label>
      </section>

      <section className="dash-card toggle-item">
        <span>Get recommended to others</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={toggles.getRecommended}
            onChange={() => toggle("getRecommended")}
          />
          <span className="slider"></span>
        </label>
      </section>

      <section className="dash-card keyword-item">
        <span>Add keywords for recommendations</span>
        <div className="keyword-controls">
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            placeholder="Enter keyword"
            className="keyword-input"
          />
          <button
            type="button"
            onClick={() => {
              if (newKeyword.trim()) {
                setKeywords([...keywords, newKeyword.trim()]);
                setNewKeyword("");
              }
            }}
            className="add-btn"
          >
            Add
          </button>
        </div>
        <div className="keyword-list">
          {keywords.map((word, i) => (
            <span key={i} className="keyword-chip">
              {word}
              <button
                type="button"
                onClick={() =>
                  setKeywords(keywords.filter((_, idx) => idx !== i))
                }
                className="remove-btn"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ------------ main component ---------------- */

export default function Dashboard() {
  const { authenticated, user } = usePrivy();

  const [toggles, setToggles] = useState({
    notifyAddedList: false,
    smsTrending: false,
    getRecommended: false,
    allowKeywords: false,
  });
  const [keywords, setKeywords] = useState([]);
  const [metric1, setMetric1] = useState(metrics[0].key);
  const [metric2, setMetric2] = useState(metrics[1].key);

  useEffect(() => {
    // fake async fetch
    setTimeout(() => {
      setToggles(fakeServerData.toggles);
      setKeywords(fakeServerData.keywords);
    }, 400);
  }, []);

  const toggle = (key) => setToggles((p) => ({ ...p, [key]: !p[key] }));

  const twitterUsername = user?.twitter?.username;
  const twitterName = user?.twitter?.name;
  const twitterProfilePicture = user?.twitter?.profilePictureUrl;

  return (
    <div className="dashboard">
      <UserCard
        name={twitterName}
        username={twitterUsername}
        avatar={twitterProfilePicture}
      />

      <MetricSelectors
        metric1={metric1}
        metric2={metric2}
        setMetric1={setMetric1}
        setMetric2={setMetric2}
      />

      <MetricsChart metric1={metric1} metric2={metric2} />

      <PrefsPanel
        toggles={toggles}
        toggle={toggle}
        keywords={keywords}
        setKeywords={setKeywords}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        {authenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
  );
}
