// Firebase Authentication Service
// src/services/authService.js

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase.config';

/**
 * Register a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} name - User full name
 * @param {string} phone - User phone number
 * @returns {Promise<Object>} User data
 */
export const registerUser = async (email, password, name, phone = '') => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile with name
    await updateProfile(user, {
      displayName: name
    });

    // Send email verification
    await sendEmailVerification(user);

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: email,
      name: name,
      phone: phone,
      role: 'customer',
      profile_image_url: '',
      status: 1,
      points: 0,
      wallet_balance: 0,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        name: name,
        role: 'customer'
      }
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User data with role
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user data from Firestore to check role
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }

    const userData = userDoc.data();

    // Get Firebase ID token
    const token = await user.getIdToken();

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        name: userData.name,
        role: userData.role,
        token: token
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Logout current user
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Send password reset email
 * @param {string} email - User email
 * @returns {Promise<Object>}
 */
export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Password reset email sent successfully'
    };
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
};

/**
 * Update user password
 * @param {string} newPassword - New password
 * @returns {Promise<Object>}
 */
export const updateUserPassword = async (newPassword) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user is currently logged in');
    }

    await updatePassword(user, newPassword);
    return {
      success: true,
      message: 'Password updated successfully'
    };
  } catch (error) {
    console.error('Password update error:', error);
    throw error;
  }
};

/**
 * Get current user data
 * @returns {Promise<Object|null>}
 */
export const getCurrentUser = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      return null;
    }

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      return null;
    }

    const userData = userDoc.data();
    return {
      uid: user.uid,
      email: user.email,
      ...userData
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

/**
 * Subscribe to authentication state changes
 * @param {Function} callback - Callback function to handle auth state
 * @returns {Function} Unsubscribe function
 */
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        callback({
          uid: user.uid,
          email: user.email,
          ...userDoc.data()
        });
      } else {
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};

/**
 * Check if user is admin
 * @returns {Promise<boolean>}
 */
export const isAdmin = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return false;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) return false;

    const userData = userDoc.data();
    return userData.role === 'admin';
  } catch (error) {
    console.error('Check admin error:', error);
    return false;
  }
};

