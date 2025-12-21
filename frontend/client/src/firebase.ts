// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIREBASE_APP_ID,
} as const;

// Validate config
const missingKeys = Object.entries(firebaseConfig)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingKeys.length > 0) {
  console.error("❌ Missing Firebase config keys:", missingKeys);
  throw new Error(`Missing Firebase environment variables: ${missingKeys.join(", ")}`);
}

console.log("🔍 Firebase config loaded:", {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? "***" : "MISSING",
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };