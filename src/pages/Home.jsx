import { useEffect, useRef, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

import "./Home.css";

function FadeInSection({ children, bgColor }) {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`fade-section ${isVisible ? "visible" : ""}`}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </section>
  );
}

export default function Home() {
  const { authenticated } = usePrivy();
  const nextRef = useRef(null);

  const handleScroll = () => {
    if (nextRef.current) {
      nextRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing">
      {/* hero */}
      <FadeInSection bgColor="#ad67d6">
        <h1 className="big-title">Reach your X creator's goals with AI edges</h1>
        <p className="subtitle">
          Curated ecosystems of Premium users.  
          Boost visibility. Generate real leads.  
          All inside X.
        </p>

        <div>
          {authenticated ? <LogoutButton /> : <LoginButton />}
          <button
            onClick={handleScroll}
            style={{
              fontSize: "2.5rem",
              padding: "12px 40px",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "100px",
              margin: "8px",
            }}
          >
            Learn more
          </button>
        </div>
      </FadeInSection>

      {/* 2nd section w/ ref target */}
      <FadeInSection bgColor="#ffcc00">
        <div ref={nextRef}>
          <h1 className="big-title">$2 Basic Access</h1>
          <ul className="feature-list">
            <li>Join niche ecosystems</li>
            <li>Monthly aligned user lists</li>
            <li>Curated engagement alerts</li>
          </ul>
        </div>
      </FadeInSection>

      {/* 3rd section */}
      <FadeInSection bgColor="#1d9bf0">
        <h1 className="big-title">$5 Premium / month</h1>
        <ul className="feature-list">
          <li>Priority placement in matches</li>
          <li>Weekly lead-gen reports</li>
          <li>Analytics & engagement insights</li>
          <li>Concierge DM intros</li>
        </ul>
      </FadeInSection>

      {/* final */}
      <FadeInSection bgColor="#ffffffff">
        <h1 className="big-title">
          Audience Discovery • Visibility Sync • Lead Generation
        </h1>
          <div>
          <button
            onClick={handleScroll}/*Go to support page*/
            style={{
              fontSize: "2.5rem",
              padding: "12px 40px",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "100px",
              margin: "8px",
            }}
          >
            View Pricing
          </button>
        </div>
      </FadeInSection>
    </div>
  );
}
