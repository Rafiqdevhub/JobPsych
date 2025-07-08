import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
      "^/analyze-resume": {
        target: "http://localhost:8000/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => `/api${path}`,
      },
      "^/generate-questions": {
        target: "http://localhost:8000/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => `/api${path}`,
      },
    },
    cors: true,
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Disable chunk hashing to prevent cache issues
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@headlessui/react", "@heroicons/react"],
        },
      },
    },
  },
});
