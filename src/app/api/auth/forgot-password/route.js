// Forgot Password API Route
// src/app/api/auth/forgot-password/route.js

import { NextResponse } from 'next/server';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/config/firebase.config';

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Send password reset email
    await sendPasswordResetEmail(auth, email);

    return NextResponse.json({
      success: true,
      message: 'Password reset email sent successfully. Please check your inbox.'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    
    // Handle specific Firebase errors
    if (error.code === 'auth/user-not-found') {
      return NextResponse.json(
        { error: 'No user found with this email' },
        { status: 404 }
      );
    }
    
    if (error.code === 'auth/invalid-email') {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send password reset email. Please try again.' },
      { status: 500 }
    );
  }
}

