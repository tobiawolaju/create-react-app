import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashbaord";
import Support from "./pages/Dashbaord";
import TopBar from "./components/TopBar";
import ProtectedRoute from "./components/ProtectedRoute";

import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";

function App() {
  const { ready, authenticated, logout } = usePrivy();

  useEffect(() => {
    function handleMessage(e) {
      if (e.data?.type === "godot-logout") {
        logout();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [logout]);

  if (!ready) return null;

  return (
    <div
      className="App"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {authenticated && <TopBar />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={authenticated ? <Dashboard /> : <Home />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
