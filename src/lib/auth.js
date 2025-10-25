// Server-side Authentication Utilities
// src/lib/auth.js

/**
 * Verify authentication token from cookies on the server-side
 * Works with Next.js 15 App Router
 */
export async function verifyAuth(request) {
  try {
    // Get token from cookie header
    const cookieHeader = request.headers.get("cookie");

    if (!cookieHeader) {
      console.log("[Auth] No cookie header found");
      return null;
    }

    // Parse cookies manually
    const cookies = {};
    cookieHeader.split(";").forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
    });

    const token = cookies["uat"];

    if (!token) {
      console.log("[Auth] No uat token found in cookies");
      console.log("[Auth] Available cookies:", Object.keys(cookies));
      return null;
    }

    console.log("[Auth] Token found");
    return { token };
  } catch (error) {
    console.error("[Auth] Verification error:", error);
    return null;
  }
}

/**
 * Extract user ID from Firebase ID token
 */
export async function getUserIdFromToken(token) {
  try {
    // Decode the JWT payload (base64)
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error("[Auth] Invalid token format");
      return null;
    }

    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());

    // Firebase tokens use 'user_id' or 'sub' for user ID
    const userId = payload.user_id || payload.sub;

    if (!userId) {
      console.error("[Auth] No user_id or sub found in token payload");
      return null;
    }

    console.log("[Auth] User ID extracted:", userId);
    return userId;
  } catch (error) {
    console.error("[Auth] Token decode error:", error);
    return null;
  }
}
