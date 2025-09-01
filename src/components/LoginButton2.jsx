import { usePrivy } from "@privy-io/react-auth";

export default function LoginButton() {
  const { login } = usePrivy();

  return (
     <button  
     
      onClick={login}
      style={{
        fontSize:"0rem",
        padding: "12px 40px",
        backgroundColor: "#ffffffff",
        color: "#000000ff",
        border: "none",
        borderRadius: "100px",
        margin:"8px",
        visibility:"hidden"
      }}>
      Log In
    </button>
  );
}
