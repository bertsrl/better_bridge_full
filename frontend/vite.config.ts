import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, path.resolve(import.meta.dirname), '');
  
  // Map Firebase env vars to import.meta.env without VITE_ prefix
  const firebaseEnvVars = {
    FIREBASE_API_KEY: env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: env.FIREBASE_APP_ID,

    KOMMO_API_TOKEN: env.KOMMO_API_TOKEN,
    KOMMO_DOMAIN: env.KOMMO_DOMAIN,
  };

  // Create define object with all Firebase vars
  const defineEnv = Object.entries(firebaseEnvVars).reduce((acc, [key, value]) => {
    acc[`import.meta.env.${key}`] = JSON.stringify(value);
    return acc;
  }, {} as Record<string, string>);

  console.log("🔍 Loaded Firebase env vars:", {
    FIREBASE_API_KEY: firebaseEnvVars.FIREBASE_API_KEY ? "***" : "MISSING",
    FIREBASE_PROJECT_ID: firebaseEnvVars.FIREBASE_PROJECT_ID || "MISSING",
    KOMMO_API_TOKEN: firebaseEnvVars.KOMMO_API_TOKEN ? "***" : "MISSING",
    KOMMO_DOMAIN: firebaseEnvVars.KOMMO_DOMAIN || "MISSING",
  });

  return {
    envDir: path.resolve(import.meta.dirname),
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