export interface EnvConfig {
  // Firebase
  FIREBASE_PROJECT_ID: string | undefined;
  FIREBASE_API_KEY: string | undefined;
  FIREBASE_AUTH_DOMAIN: string | undefined; // ... other Firebase config // OAuth
  FIREBASE_STORAGE_BUCKET: string | undefined;
  FIREBASE_MESSAGING_SENDER_ID: string | undefined;
  FIREBASE_APP_ID: string | undefined;
  
  KOMMO_API_TOKEN: string | undefined;
  
  HUBSPOT_CLIENT_ID: string | undefined;
  HUBSPOT_CLIENT_SECRET: string | undefined; // Environment
  
  OAUTH_GOOGLE_CLIENT_ID: string | undefined;
  OAUTH_GOOGLE_PROJECT_ID: string | undefined;
  OAUTH_GOOGLE_AUTH_URI: string | undefined;
  OAUTH_GOOGLE_TOKEN_URI: string | undefined;
  OAUTH_GOOGLE_AUTH_PROVIDER_X509_CERT_URL: string | undefined;
  OAUTH_GOOGLE_CLIENT_SECRET: string | undefined;

  NODE_ENV: "development" | "production" | "test";
  BACKEND_PORT: string | undefined;
  FRONTEND_PORT: string | undefined;
  BASE_URL: string | undefined; // localhost:3000 or GCP container IP // Security
  
  JWT_SECRET?: string | undefined;

  ENCRYPTION_KEY: string | undefined; // For OAuth token encryption // Rate Limiting
  ENCRYPTION_IV: string | undefined;
  
  GLOBAL_RATE_LIMIT_PER_MINUTE?: string | undefined;
}