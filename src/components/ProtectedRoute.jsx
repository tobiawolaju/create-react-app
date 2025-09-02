import { Navigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";

export default function ProtectedRoute({ children }) {
  const { authenticated } = usePrivy();

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
