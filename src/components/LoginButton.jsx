import { usePrivy } from "@privy-io/react-auth";

export default function LoginButton() {
  const { login } = usePrivy();

  return (
    <button
      onClick={login}
      style={{
        padding: "12px",
        backgroundColor: "#069478",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
      }}
    >
      Log In
    </button>
  );
}
