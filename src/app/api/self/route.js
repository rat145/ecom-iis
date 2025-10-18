// Get Current User API Route
// src/app/api/self/route.js

import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase.config';

export async function GET(request) {
  try {
    const user = auth.currentUser;

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: 'User data not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();

    return NextResponse.json({
      success: true,
      data: {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        ...userData
      }
    });

  } catch (error) {
    console.error('Get current user error:', error);
    
    return NextResponse.json(
      { error: 'Failed to get user data' },
      { status: 500 }
    );
  }
}

