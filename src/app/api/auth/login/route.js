// Login API Route
// src/app/api/auth/login/route.js

import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase.config";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: "User data not found" },
        { status: 404 }
      );
    }

    const userData = userDoc.data();

    // Check if user is active
    if (userData.status !== 1) {
      return NextResponse.json(
        { error: "Account is inactive" },
        { status: 403 }
      );
    }

    // Get Firebase ID token
    const token = await user.getIdToken();

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          uid: user.uid,
          email: user.email,
          name: userData.name,
          role: userData.role,
          profile_image_url: userData.profile_image_url,
        },
        token: token,
      },
    });

    // Set cookie with proper attributes for production
    response.cookies.set("uat", token, {
      httpOnly: false, // Allow JavaScript access (needed for client-side)
      secure: true, // Only send over HTTPS
      sameSite: "lax", // Allow same-site requests
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: "/", // Available across entire site
    });

    console.log("[Login] Cookie set in response");

    return response;
  } catch (error) {
    console.error("Login error:", error);

    // Handle specific Firebase errors
    if (error.code === "auth/user-not-found") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (error.code === "auth/wrong-password") {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    if (error.code === "auth/invalid-email") {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
