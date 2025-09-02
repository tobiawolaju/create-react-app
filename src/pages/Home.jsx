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
<FadeInSection bgColor="#ffffffff">
  <h1 style={{color:'#b300ff'}}>InfluencerLab</h1>
  <h1 className="big-title">
    stop shouting into the void. start printing followers + payouts.
  </h1>

  <p style={{marginTop:'0rem', fontSize:'1.2rem', color:'#333', fontWeight:'500'}}>
    14 days. $2. our private networks hijack x’s algo → 
    more reach, faster growth, actual money.  
    miss this, stay stuck.
  </p>

  <div>
    <button
      onClick={handleScroll}
      style={{
        fontSize: "1.5rem",
        padding: "14px 30px",
        backgroundColor: "#000",
        color: "#fff",
        border: "none",
        borderRadius: "100px",
        margin: "16px",
        cursor: "pointer",
        fontWeight:"700"
      }}
    >
      claim your spot →
    </button>
  </div>
</FadeInSection>

{/* 2nd section */}
<FadeInSection bgColor="#b300ff">
  <div ref={nextRef}>
    <h1 className="big-title2">how it works</h1>
    <ul className="feature-list2">
      <li>• tap into hidden engagement rings.</li>
      <li>• fresh user lists, weekly—never stale.</li>
      <li>• alerts when it’s your turn to shine.</li>
    </ul>
    <p style={{marginTop:"1rem", fontWeight:"600"}}>
      others pay $15 for “growth hacks.” you pay $2 and steal their audience.
    </p>
  </div>
</FadeInSection>

{/* pricing */}
<FadeInSection bgColor="#000000">
  <h1 className="big-title2">pricing</h1>
  <ul className="feature-list2">
    <li>• try it free for 7 days (yes, free).</li>
    <li>• no X premium required.</li>
    <li>• $3/month after—less than coffee, more than hype.</li>
  </ul>
  <p style={{marginTop:"1rem", color:"#fff", opacity:0.8}}>
    ⚡ only early signups get locked-in pricing.
  </p>
</FadeInSection>

{/* final punch */}
<FadeInSection bgColor="#d1d1d1">
  <h1 className="big-title">
    16-year-olds are farming clout + cash while you doomscroll.  
    what's your excuse?
  </h1>
  <div>
    {authenticated ? <LogoutButton /> : <LoginButton />}
  </div>
</FadeInSection>


    </div>
  );
}
