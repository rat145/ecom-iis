// Authentication Context Provider
// src/contexts/AuthContext.js

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase.config";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();

            // Get and store token with proper cookie settings
            const token = await firebaseUser.getIdToken();

            // Set cookie with proper attributes for Vercel/production
            Cookies.set("uat", token, {
              expires: 7, // 7 days
              sameSite: "Lax", // Allow same-site requests (works for same domain)
              secure: true, // Only send over HTTPS (required for production)
              path: "/", // Available across entire site
            });

            console.log("[AuthContext] Token stored in cookie");

            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              emailVerified: firebaseUser.emailVerified,
              ...userData,
            });
          } else {
            setUser(null);
            Cookies.remove("uat", { path: "/" });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
          Cookies.remove("uat", { path: "/" });
        }
      } else {
        setUser(null);
        Cookies.remove("uat", { path: "/" });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isCustomer: user?.role === "customer",
    isVendor: user?.role === "vendor",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
