// Logout API Route
// src/app/api/auth/logout/route.js

import { NextResponse } from 'next/server';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase.config';

export async function POST(request) {
  try {
    await signOut(auth);

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Logout error:', error);
    
    return NextResponse.json(
      { error: 'Logout failed. Please try again.' },
      { status: 500 }
    );
  }
}

