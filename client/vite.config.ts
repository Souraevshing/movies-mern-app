import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  worker: {
    rollupOptions: { cache: true },
  },
  ssr: {
    target: "node",
  },
  server: {
    hmr: true,
    allowedHosts: ["http://localhost:5000"],
    cors: {
      origin: "http://localhost:5000",
    },
    proxy: {
      "/api/": "http://localhost:3000",
      "/uploads/": "http://localhost:3000",
    },
  },
});
