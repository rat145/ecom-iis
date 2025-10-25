// Get Current User API Route (FIXED VERSION)
// src/app/api/self/route.js

import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { verifyAuth, getUserIdFromToken } from "@/lib/auth";

export async function GET(request) {
  console.log("[/api/self] Request received");

  try {
    // Log cookie header for debugging
    const cookieHeader = request.headers.get("cookie");
    console.log("[/api/self] Cookie header present:", !!cookieHeader);

    // Verify authentication using server-side method
    const authResult = await verifyAuth(request);

    if (!authResult || !authResult.token) {
      console.log("[/api/self] Authentication failed - no token");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    console.log("[/api/self] Token found, extracting user ID");

    // Extract user ID from token
    const userId = await getUserIdFromToken(authResult.token);

    if (!userId) {
      console.log("[/api/self] Failed to extract user ID from token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    console.log("[/api/self] User ID extracted, fetching from Firestore");

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", userId));

    if (!userDoc.exists()) {
      console.log("[/api/self] User document not found in Firestore");
      return NextResponse.json(
        { error: "User data not found" },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    console.log("[/api/self] User data retrieved successfully");

    return NextResponse.json({
      success: true,
      data: {
        uid: userId,
        ...userData,
      },
    });
  } catch (error) {
    console.error("[/api/self] Error:", error);

    return NextResponse.json(
      { error: "Failed to get user data", details: error.message },
      { status: 500 }
    );
  }
}
