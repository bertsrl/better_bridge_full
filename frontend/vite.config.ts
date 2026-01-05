import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { metaImagesPlugin } from "./vite-plugin-meta-images";
import kommoConfig from "../_shared/kommo/kommo-config";
import { firebaseConfig } from "../_shared/firebase/firebase-config";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // const env = loadEnv(mode, path.resolve(import.meta.dirname), '');
  
  // Map Firebase env vars to import.meta.env without VITE_ prefix
  const firebaseEnvVars = {
    FIREBASE_API_KEY: firebaseConfig.apiKey,
    FIREBASE_AUTH_DOMAIN: firebaseConfig.authDomain,
    FIREBASE_PROJECT_ID: firebaseConfig.projectId,
    FIREBASE_STORAGE_BUCKET: firebaseConfig.storageBucket,
    FIREBASE_MESSAGING_SENDER_ID: firebaseConfig.messagingSenderId,
    FIREBASE_APP_ID: firebaseConfig.appId,
  };

  const kommoEnvVars = {
    KOMMO_API_TOKEN: kommoConfig.apiToken,
    KOMMO_DOMAIN: kommoConfig.domain,
  };

  // Create define object with all Firebase vars
  // const defineEnv = Object.entries(firebaseEnvVars).reduce((acc, [key, value]) => {
  //   acc[`import.meta.env.${key}`] = JSON.stringify(value);
  //   return acc;
  // }, {} as Record<string, string>);

  console.log("🔍 Loaded Firebase env vars:", {
    ...firebaseEnvVars,
    ...kommoEnvVars,
  }); 

  return {
    // envDir: path.resolve(),
    plugins: [
      react(),
      tailwindcss(),
      metaImagesPlugin(),
      [],
    ],
    // define: {
    // 'import.meta.env.VITE_FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
    // 'import.meta.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
    // 'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
    // 'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
    // 'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
    // 'import.meta.env.VITE_FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
    // 'import.meta.env.VITE_KOMMO_API_TOKEN': JSON.stringify(process.env.KOMMO_API_TOKEN),
    // 'import.meta.env.VITE_KOMMO_DOMAIN': JSON.stringify(process.env.KOMMO_DOMAIN),
    // },
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