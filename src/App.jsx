import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashbaord";
import About from "./pages/Dashbaord";
import Support from "./pages/Dashbaord";
import TopBar from "./components/TopBar";

import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";


function App() {
  const { ready, authenticated, user, logout } = usePrivy();

  

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
    <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar />
      <main style={{ flex: 1}}>
        <Routes>
          <Route path="/" element={authenticated ? <Dashboard user={user}/> : <Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;
