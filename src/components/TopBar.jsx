import { Link } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import LoginButton from "./LoginButton2";
import LogoutButton from "./LogoutButton";

export default function TopBar() {
  const { authenticated } = usePrivy();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        padding: "0 1.5rem",
        backdropFilter: "blur(12px)",
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(255,255,255,0.15))",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          alignItems: "center",
        }}
      >
       <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/support" style={linkStyle}>Support</Link>
        </div>

      <div>
        {authenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#fff", // solid white
  fontSize: "1rem",
  fontWeight: 500,
};
