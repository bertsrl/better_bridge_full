import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { metaImagesPlugin } from "./vite-plugin-meta-images";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // const env = loadEnv(mode, path.resolve(import.meta.dirname), '');
  
  // Map Firebase env vars to import.meta.env without VITE_ prefix
  const firebaseEnvVars = {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,

    KOMMO_API_TOKEN: process.env.KOMMO_API_TOKEN,
    KOMMO_DOMAIN: process.env.KOMMO_DOMAIN,
  };

  // Create define object with all Firebase vars
  const defineEnv = Object.entries(firebaseEnvVars).reduce((acc, [key, value]) => {
    acc[`import.meta.env.${key}`] = JSON.stringify(value);
    return acc;
  }, {} as Record<string, string>);

  console.log("🔍 Loaded Firebase env vars:", {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY ? "***" : "MISSING",
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ? "***" : "MISSING",
    KOMMO_API_TOKEN: process.env.KOMMO_API_TOKEN ? "***" : "MISSING",
    KOMMO_DOMAIN: process.env.KOMMO_DOMAIN ? "***" : "MISSING",
  });

  return {
    // envDir: path.resolve(),
    plugins: [
      react(),
      tailwindcss(),
      metaImagesPlugin(),
      [],
    ],
    define: {
      ...defineEnv,
      // Keep this for any other process.env usage
      "process.env": "import.meta.env",
    },
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(import.meta.dirname, "client", "src") },
        { find: "@shared", replacement: path.resolve(import.meta.dirname, "shared") },
        { find: "@assets", replacement: path.resolve(import.meta.dirname, "attached_assets") },
        { find: "PARENT_DIR", replacement: path.resolve(import.meta.dirname, "..") },
      ],
    },
    css: {
      postcss: {
        plugins: [],
      },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
    },
    server: {
      host: "0.0.0.0",
      allowedHosts: true,
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});