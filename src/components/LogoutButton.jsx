import { usePrivy } from "@privy-io/react-auth";

export default function LogoutButton() {
  const { logout } = usePrivy();

  return (
    <button
      onClick={logout}
      style={{
        padding: "12px",
        backgroundColor: "#d33",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
      }}
    >
      Log Out
    </button>
  );
}
