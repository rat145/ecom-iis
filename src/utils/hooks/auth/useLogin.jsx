"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  emailSchema,
  passwordSchema,
  YupObject,
} from "../../validation/ValidationSchemas";
import { loginUser } from "@/services/authService";

export const LogInSchema = YupObject({
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Custom hook for handling user login with Firebase
 * @returns {Object} Login mutation function and loading state
 */
const useHandleLogin = (i18Lang = "en") => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (values) => {
    setIsLoading(true);

    try {
      // Login with Firebase
      const result = await loginUser(values.email, values.password);

      if (result.success) {
        toast.success("Login successful!");

        // Redirect based on user role
        if (result.user.role === "admin") {
          // Admins should use the admin panel
          toast.info("Admin users should use the admin panel");
          router.push(`/${i18Lang}/account/dashboard`);
        } else if (result.user.role === "vendor") {
          router.push(`/${i18Lang}/account/dashboard`);
        } else {
          // Regular customers
          router.push(`/${i18Lang}/account/dashboard`);
        }
      }
    } catch (error) {
      console.error("Login error:", error);

      // Handle specific Firebase errors
      let errorMessage = "Login failed. Please try again.";

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Invalid email or password.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "This account has been disabled.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage =
          "Too many failed login attempts. Please try again later.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
  };
};

export default useHandleLogin;
