import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => {
  const isDev = command === "serve";
  const backendUrl = isDev
    ? "http://localhost:8000"
    : "https://hr-resume-analyzer-backend.vercel.app";

  return {
    plugins: [tailwindcss()],
    server: {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      proxy: {
        "/api": {
          target: backendUrl,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
        "^/analyze-resume": {
          target: `${backendUrl}/api`,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => `/api${path}`,
        },
        "^/generate-questions": {
          target: `${backendUrl}/api`,
          changeOrigin: true,
          secure: true,
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
  };
});
