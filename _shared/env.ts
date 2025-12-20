import dotenv from 'dotenv';
dotenv.config();

// Export a function that reads env vars at runtime, not at module load time
export function getEnv(): Record<string, string> {
  return {
    // Firebase
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    
    // Kommo
    KOMMO_API_TOKEN: process.env.KOMMO_API_TOKEN,
    KOMMO_DOMAIN: process.env.KOMMO_DOMAIN,

    // Hubspot
    HUBSPOT_CLIENT_ID: process.env.HUBSPOT_CLIENT_ID,
    HUBSPOT_CLIENT_SECRET: process.env.HUBSPOT_CLIENT_SECRET,
    
    // OAuth Google
    OAUTH_GOOGLE_CLIENT_ID: process.env.OAUTH_GOOGLE_CLIENT_ID,
    OAUTH_GOOGLE_PROJECT_ID: process.env.OAUTH_GOOGLE_PROJECT_ID,
    OAUTH_GOOGLE_AUTH_URI: process.env.OAUTH_GOOGLE_AUTH_URI,
    OAUTH_GOOGLE_TOKEN_URI: process.env.OAUTH_GOOGLE_TOKEN_URI,
    OAUTH_GOOGLE_AUTH_PROVIDER_X509_CERT_URL: process.env.OAUTH_GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
    OAUTH_GOOGLE_CLIENT_SECRET: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
    
    // Environment
    NODE_ENV: (process.env.NODE_ENV) as "development" | "production" | "test",
    BACKEND_PORT: process.env.BACKEND_PORT,
    FRONTEND_PORT: process.env.FRONTEND_PORT,
    BASE_URL: process.env.BASE_URL,
    
    // Security
    JWT_SECRET: process.env.JWT_SECRET,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    ENCRYPTION_IV: process.env.ENCRYPTION_IV,
    GLOBAL_RATE_LIMIT_PER_MINUTE: process.env.GLOBAL_RATE_LIMIT_PER_MINUTE,
  };
}