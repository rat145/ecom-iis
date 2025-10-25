// Register API Route
// src/app/api/auth/register/route.js

import { NextResponse } from "next/server";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/config/firebase.config";

export async function POST(request) {
  try {
    const { email, password, name, phone, country_code } = await request.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update user profile with name
    await updateProfile(user, {
      displayName: name,
    });

    // Send email verification
    try {
      await sendEmailVerification(user);
    } catch (emailError) {
      console.error("Email verification error:", emailError);
      // Continue even if email verification fails
    }

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: email,
      name: name,
      phone: phone || "",
      country_code: country_code || "",
      role: "customer",
      profile_image_url: "",
      status: 1,
      points: 0,
      wallet_balance: 0,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });

    // Get Firebase ID token
    const token = await user.getIdToken();

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      message: "Registration successful. Please verify your email.",
      data: {
        user: {
          uid: user.uid,
          email: user.email,
          name: name,
          role: "customer",
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

    console.log("[Register] Cookie set in response");

    return response;
  } catch (error) {
    console.error("Registration error:", error);

    // Handle specific Firebase errors
    if (error.code === "auth/email-already-in-use") {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 409 }
      );
    }

    if (error.code === "auth/invalid-email") {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (error.code === "auth/weak-password") {
      return NextResponse.json(
        { error: "Password is too weak" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
