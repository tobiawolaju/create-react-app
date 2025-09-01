import { usePrivy } from "@privy-io/react-auth";

export default function LogoutButton() {
  const { logout } = usePrivy();

  return (
    <button
      data-testid="logout-button"
      onClick={logout}
     style={{
        fontSize:"1rem",
        padding: "12px 40px",
        backgroundColor: "#ffffffff",
        color: "#000000ff",
        border: "none",
        borderRadius: "100px",
        margin:"8px",
      }}>

      Logout
    </button>
  );
}
