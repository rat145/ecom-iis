// Firebase Configuration
// src/config/firebase.config.js

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFirebaseConfig } from "@/utils/validateEnv";

// Get and validate Firebase configuration
const firebaseConfig = getFirebaseConfig();

// Initialize Firebase (avoid multiple initializations)
let app;
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    console.log("✅ Firebase initialized successfully");
  } catch (error) {
    console.error("❌ Firebase initialization error:", error);
    throw error;
  }
} else {
  app = getApps()[0];
  console.log("ℹ️  Using existing Firebase app instance");
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable persistence for Firestore (optional, for offline support)
// if (typeof window !== 'undefined') {
//   import('firebase/firestore').then(({ enableIndexedDbPersistence }) => {
//     enableIndexedDbPersistence(db).catch((err) => {
//       if (err.code === 'failed-precondition') {
//         console.warn('⚠️  Firestore persistence failed: Multiple tabs open');
//       } else if (err.code === 'unimplemented') {
//         console.warn('⚠️  Firestore persistence not available in this browser');
//       }
//     });
//   });
// }

export default app;
