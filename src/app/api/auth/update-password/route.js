// Update Password API Route
// src/app/api/auth/update-password/route.js

import { NextResponse } from 'next/server';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '@/config/firebase.config';

export async function POST(request) {
  try {
    const { current_password, new_password } = await request.json();

    // Validate input
    if (!current_password || !new_password) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    // Validate new password strength
    if (new_password.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const user = auth.currentUser;
    
    if (!user) {
      return NextResponse.json(
        { error: 'No user is currently logged in' },
        { status: 401 }
      );
    }

    // Re-authenticate user before password update
    const credential = EmailAuthProvider.credential(user.email, current_password);
    
    try {
      await reauthenticateWithCredential(user, credential);
    } catch (reauthError) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    // Update password
    await updatePassword(user, new_password);

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Update password error:', error);
    
    if (error.code === 'auth/weak-password') {
      return NextResponse.json(
        { error: 'New password is too weak' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update password. Please try again.' },
      { status: 500 }
    );
  }
}

