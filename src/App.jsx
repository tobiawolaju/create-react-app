import "./App.css";
import { usePrivy } from "@privy-io/react-auth";

import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Home from "./pages/Home";
import Gameplay from "./pages/Gameplay";

function App() {
  const { ready, authenticated, user } = usePrivy();

  if (!ready) return null;

  return (
    <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* top-right login/logout */}
     <header
  style={{
    width: "calc(100% - 2rem)", // typo fixed: was "cal"
    position: "fixed",
    top: 0,
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem",
  }}
>
  {authenticated ? <LogoutButton /> : <LoginButton />}
</header>


      {/* main content */}
      <main style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {authenticated ? <Gameplay user={user} /> : <Home />}
      </main>
    </div>
  );
}

export default App;
