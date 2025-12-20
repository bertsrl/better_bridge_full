// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "PARENT_DIR/_shared/firebase/firebase-config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };