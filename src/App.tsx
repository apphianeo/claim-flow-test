import { useState } from "react";
import { Login } from "./screens/Login";
import { ClaimsMain } from "./screens/ClaimsMain";
import { ClaimForm } from "./screens/ClaimForm";
import { Completion } from "./screens/Completion";

type Screen = "login" | "main" | "form" | "completion";

/**
 * Top-level flow router. This is a single linear prototype flow, so we use
 * local state to switch screens rather than pulling in a router.
 */
export default function App() {
  const [screen, setScreen] = useState<Screen>("login");

  return (
    <>
      {screen === "login" && <Login onSubmit={() => setScreen("main")} />}
      {screen === "main" && (
        <ClaimsMain
          onAddClaim={() => setScreen("form")}
          onSignOut={() => setScreen("login")}
        />
      )}
      {screen === "form" && (
        <ClaimForm
          onCancel={() => setScreen("main")}
          onComplete={() => setScreen("completion")}
        />
      )}
      {screen === "completion" && (
        <Completion
          onReturnHome={() => setScreen("main")}
          onNewClaim={() => setScreen("form")}
        />
      )}
    </>
  );
}
