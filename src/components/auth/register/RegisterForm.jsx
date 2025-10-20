"use client";

import { useContext, useState } from "react";
import { Form, Formik } from "formik";
import { Col, Input, Label } from "reactstrap";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/helper/i18NextContext";
import {
  YupObject,
  emailSchema,
  nameSchema,
  passwordConfirmationSchema,
  passwordSchema,
  phoneSchema,
} from "@/utils/validation/ValidationSchemas";
import FormBtn from "@/components/common/FormBtn";
import SimpleInputField from "@/components/common/inputFields/SimpleInputField";
import { AllCountryCode } from "../../../data/AllCountryCode";
import SearchableSelectInput from "@/components/common/inputFields/SearchableSelectInput";
import { registerUser } from "@/services/authService";

const RegisterForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async (values) => {
    // Validate terms acceptance
    if (!termsAccepted) {
      toast.error("Please accept the Terms and Privacy Policy");
      return;
    }

    setLoading(true);

    try {
      // Combine country code and phone
      const fullPhone =
        values.country_code && values.phone
          ? `+${values.country_code}${values.phone}`
          : "";

      // Register user with Firebase
      const result = await registerUser(
        values.email,
        values.password,
        values.name,
        fullPhone
      );

      if (result.success) {
        toast.success(
          "Registration successful! Please check your email to verify your account."
        );

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push(`/${i18Lang}/auth/login`);
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);

      // Handle specific Firebase errors
      let errorMessage = "Registration failed. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already registered. Please login instead.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use a stronger password.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        country_code: "91",
        phone: "",
      }}
      validationSchema={YupObject({
        name: nameSchema,
        email: emailSchema,
        password: passwordSchema,
        password_confirmation: passwordConfirmationSchema,
        phone: phoneSchema,
      })}
      onSubmit={handleRegister}
    >
      {({ values }) => (
        <Form className="row g-md-4 g-3">
          <SimpleInputField
            nameList={[
              {
                name: "name",
                placeholder: t("FullName"),
                title: "Name",
                label: "FullName",
              },
              {
                name: "email",
                placeholder: t("EmailAddress"),
                title: "Email",
                label: "EmailAddress",
              },
              {
                name: "password",
                placeholder: t("Password"),
                type: "password",
                title: "Password",
                label: "Password",
              },
              {
                name: "password_confirmation",
                type: "password",
                placeholder: t("ConfirmPassword"),
                title: "ConfirmPassword",
                label: "ConfirmPassword",
              },
            ]}
          />
          <Col xs="12">
            <div className="country-input">
              <SearchableSelectInput
                nameList={[
                  {
                    name: "country_code",
                    notitle: "true",
                    inputprops: {
                      name: "country_code",
                      id: "country_code",
                      options: AllCountryCode,
                    },
                  },
                ]}
              />
              <SimpleInputField
                nameList={[
                  {
                    name: "phone",
                    type: "number",
                    placeholder: t("EnterPhoneNumber"),
                    colclass: "country-input-box",
                    title: "Phone",
                    label: "Phone",
                  },
                ]}
              />
            </div>
          </Col>

          <Col xs={12}>
            <div className="forgot-box">
              <div className="form-check remember-box">
                <Input
                  className="checkbox_animated check-box"
                  type="checkbox"
                  id="flexCheckDefault"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <Label className="form-check-label" htmlFor="flexCheckDefault">
                  {t("IAgreeWith")}
                  <span>{t("Terms")}</span> {t("And")}{" "}
                  <span>{t("Privacy")}</span>
                </Label>
              </div>
            </div>
          </Col>
          <FormBtn
            title={"SignUp"}
            classes={{ btnClass: "btn btn-animation w-100" }}
            loading={loading}
            disabled={loading}
          />
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
