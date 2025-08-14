import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => {
  const isDev = command === "serve";

  return {
    plugins: [tailwindcss()],
    server: {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      // Only use proxy in development for CORS handling
      ...(isDev && {
        proxy: {
          "/api": {
            target: "http://localhost:8000",
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, "/api"),
          },
        },
      }),
      cors: true,
      port: 3000,
      host: "0.0.0.0",
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
  };
});
