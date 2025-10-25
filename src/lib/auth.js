// Server-side Authentication Utilities
// src/lib/auth.js

import { cookies } from "next/headers";

/**
 * Verify authentication token from cookies on the server-side
 */
export async function verifyAuth(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("uat")?.value;

    if (!token) {
      return null;
    }

    return { token };
  } catch (error) {
    console.error("Auth verification error:", error);
    return null;
  }
}

/**
 * Extract user ID from token
 */
export async function getUserIdFromToken(token) {
  try {
    // Decode the JWT payload
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    return payload.user_id || payload.sub;
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
}
