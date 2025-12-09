import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      "/api": "http://127.0.0.1:8000",
      "/weather": "http://127.0.0.1:8000",
      "/market": "http://127.0.0.1:8000",
    },
  },

  build: {
    chunkSizeWarningLimit: 1000, // optional: naikkan batas supaya warning hilang
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom"))
              return "vendor_react";
            if (id.includes("recharts")) return "vendor_recharts";
            if (id.includes("lucide")) return "vendor_icons";
            if (id.includes("jspdf")) return "vendor_pdf";
            return "vendor_misc"; // lainnya
          }
        },
      },
    },
  },
});
