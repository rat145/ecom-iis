"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { emailSchema, YupObject } from "../../validation/ValidationSchemas";
import { sendPasswordReset } from "@/services/authService";

export const ForgotPasswordSchema = YupObject({
  email: emailSchema,
});

/**
 * Custom hook for handling forgot password with Firebase
 * @returns {Object} Forgot password mutation function and loading state
 */
const useHandleForgotPassword = (i18Lang = "en") => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (values) => {
    setIsLoading(true);

    try {
      // Send password reset email via Firebase
      const result = await sendPasswordReset(values.email);

      if (result.success) {
        toast.success("Password reset email sent! Please check your inbox.");

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push(`/${i18Lang}/auth/login`);
        }, 2000);
      }
    } catch (error) {
      console.error("Forgot password error:", error);

      // Handle specific Firebase errors
      let errorMessage = "Failed to send reset email. Please try again.";

      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email address.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many requests. Please try again later.";
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

export default useHandleForgotPassword;
