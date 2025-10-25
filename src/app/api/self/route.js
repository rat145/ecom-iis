// Get Current User API Route (FIXED VERSION)
// src/app/api/self/route.js

import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { verifyAuth, getUserIdFromToken } from "@/lib/auth";

export async function GET(request) {
  try {
    // Verify authentication using server-side method
    const authResult = await verifyAuth(request);

    if (!authResult || !authResult.token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Extract user ID from token
    const userId = await getUserIdFromToken(authResult.token);

    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", userId));

    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: "User data not found" },
        { status: 404 }
      );
    }

    const userData = userDoc.data();

    return NextResponse.json({
      success: true,
      data: {
        uid: userId,
        ...userData,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return NextResponse.json(
      { error: "Failed to get user data" },
      { status: 500 }
    );
  }
}
