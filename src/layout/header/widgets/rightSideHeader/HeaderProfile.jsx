"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiLogoutBoxRLine, RiUserLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { logoutUser } from "@/services/authService";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { useTranslation } from "@/app/i18n/client";

const HeaderProfile = ({ i18Lang = "en" }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(i18Lang, "common");

  const handleLogout = async () => {
    setLoading(true);

    try {
      await logoutUser();
      toast.success("Logged out successfully");
      setModal(false);
      router.push(`/${i18Lang}/auth/login`);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get user's first letter for avatar fallback
  const getUserInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <li className="right-side onhover-dropdown">
      <div className="delivery-login-box">
        <div className="delivery-icon">
          {user?.profile_image_url ? (
            <img
              src={user.profile_image_url}
              alt={user.name || "User"}
              className="img-fluid rounded-circle"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
          ) : (
            <div
              className="user-avatar-placeholder"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#0da487",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {getUserInitial()}
            </div>
          )}
        </div>
        <div className="delivery-detail">
          <h6>
            {t("Hi")}, {user?.name || t("User")}
          </h6>
          <h5>{t("MyAccount")}</h5>
        </div>
      </div>

      <div className="onhover-div onhover-div-login">
        <ul className="user-box-name">
          <li className="product-box-contain">
            <Link href={`/${i18Lang}/account/dashboard`}>
              <RiUserLine className="me-2" /> {t("MyAccount")}
            </Link>
          </li>
          <li className="product-box-contain" onClick={() => setModal(true)}>
            <a style={{ cursor: "pointer" }}>
              <RiLogoutBoxRLine className="me-2" /> {t("Logout")}
            </a>
          </li>
        </ul>
      </div>

      <ConfirmationModal
        modal={modal}
        setModal={setModal}
        confirmFunction={handleLogout}
        isLoading={loading}
      />
    </li>
  );
};

export default HeaderProfile;
