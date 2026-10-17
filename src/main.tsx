import { Component, StrictMode, type ErrorInfo, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/inter";
import "./styles.css";
import App from "./App";
import LegalPage from "./LegalPage";
import { DOC_PATHS } from "./legal";

// /privacypolicy is the same URL as the current site, so existing links (e.g. app-store listings) keep working.
const path = window.location.pathname.toLowerCase().replace(/\/+$/, "");
const doc = DOC_PATHS[path];

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
        <pre style={{ whiteSpace: "pre-wrap", background: "#eae3d8", padding: 16, borderRadius: 8 }}>
          {String(this.state.error.stack || this.state.error.message)}
        </pre>
      </div>
    );
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Boundary>
      {doc ? <LegalPage doc={doc} /> : <App />}
    </Boundary>
  </StrictMode>,
);
