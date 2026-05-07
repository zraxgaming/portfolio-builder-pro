import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],

  resolve: {
    alias: {
      "@": "/src",
    },
  },

  // IMPORTANT:
  // DO NOT override outputDir or SSR build structure
  // Let TanStack Start control it fully
});