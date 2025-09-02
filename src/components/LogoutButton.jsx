import { usePrivy } from "@privy-io/react-auth";

export default function LogoutButton() {
  const { logout } = usePrivy();

  return (
    <button
      onClick={logout}
      style={{
        fontSize: "0.8rem",
        padding: "4px 10px",
        background: "transparent",
        color: "rgba(255,255,255,0.4)",
        border: "none",
        cursor: "pointer",
      }}
    >
      logout
    </button>
  );
}
