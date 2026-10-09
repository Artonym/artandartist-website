import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  // Pre-bundle everything at startup so Vite never has to re-optimise and
  // reload mid-load on the first run (that race can leave a blank page).
  optimizeDeps: {
    include: ["react", "react-dom/client", "react/jsx-dev-runtime", "motion/react", "lenis"],
  },
});
