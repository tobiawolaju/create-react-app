import { NavLink, useLocation } from "react-router-dom";

export default function TopBar() {
  const location = useLocation();

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
        justifyContent: "center",
        padding: "0rem",
        backdropFilter: "blur(8px)",
        background:
          "linear-gradient(to bottom, #2b2937, #2b293714)",
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
        <NavLink
          to="/dashboard"
          style={({ isActive }) =>
            navLinkStyle({
              isActive:
                isActive || location.pathname === "/", // treat "/" as dashboard
            })
          }
        >
          Dashboard
        </NavLink>
        <NavLink to="/lists" style={navLinkStyle}>
          Lists
        </NavLink>
        <NavLink to="/support" style={navLinkStyle}>
          Support
        </NavLink>
      </div>
    </nav>
  );
}

const navLinkStyle = ({ isActive }) => ({
  textDecoration: isActive ? "underline" : "none",
  color: isActive ? "#fff" : "#ffffff6e",
  fontSize: "1rem",
  fontWeight: isActive ? 700 : 500,
});
