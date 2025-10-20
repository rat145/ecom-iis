/**
 * Environment Variables Validation Utility
 * Place this file at: src/utils/validateEnv.js
 *
 * Import and call this at the top of your firebase.config.js
 */

/**
 * Validates that all required Firebase environment variables are set
 * @throws {Error} If any required environment variable is missing
 */
export const validateFirebaseEnv = () => {
  const requiredEnvVars = [
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID",
  ];

  const missingVars = [];

  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    const errorMessage = `
╔════════════════════════════════════════════════════════════════╗
║                   FIREBASE CONFIGURATION ERROR                  ║
╚════════════════════════════════════════════════════════════════╝

Missing required environment variables:
${missingVars.map((v) => `  ❌ ${v}`).join("\n")}

Please ensure your .env.local file contains all required Firebase credentials:

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id (optional)

You can find these values in your Firebase Console:
https://console.firebase.google.com/project/YOUR_PROJECT/settings/general

After adding the variables, restart your development server.
    `;

    console.error(errorMessage);
    throw new Error(
      "Firebase configuration is incomplete. Check console for details."
    );
  }

  // Validate format
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;

  if (apiKey && apiKey.length < 20) {
    console.warn(
      "⚠️  Firebase API Key seems too short. Please verify it is correct."
    );
  }

  if (projectId && !authDomain.includes(projectId)) {
    console.warn(
      "⚠️  Auth Domain does not match Project ID. Please verify your configuration."
    );
  }

  console.log("✅ Firebase environment variables validated successfully");
};

/**
 * Get Firebase configuration from environment variables
 * @returns {Object} Firebase configuration object
 */
export const getFirebaseConfig = () => {
  validateFirebaseEnv();

  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
};

export default validateFirebaseEnv;
