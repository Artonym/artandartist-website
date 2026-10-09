import { Component, StrictMode, type ErrorInfo, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/400.css";
import "./styles.css";
import App from "./App";
import PrivacyPage from "./PrivacyPage";

// Same URL as the current site, so existing links (e.g. app-store listings) keep working.
const path = window.location.pathname.toLowerCase().replace(/\/+$/, "");
const Page = path === "/privacypolicy" ? PrivacyPage : App;

/* If anything throws while rendering, show it instead of a blank page. */
class Boundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ padding: 32, fontFamily: "system-ui, sans-serif", maxWidth: 720 }}>
        <h1 style={{ fontSize: 24 }}>Something went wrong loading Art &amp; Artist</h1>
        <p style={{ margin: "12px 0" }}>Try a hard refresh (Ctrl + Shift + R). If it keeps happening, the message below says why:</p>
        <pre style={{ whiteSpace: "pre-wrap", background: "#f4f1e8", padding: 16, borderRadius: 8 }}>
          {String(this.state.error.stack || this.state.error.message)}
        </pre>
      </div>
    );
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Boundary>
      <Page />
    </Boundary>
  </StrictMode>,
);
