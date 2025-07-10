"use server";

import { insertSignup, SignupData } from "@/lib/supabase";

interface SignupResult {
  success: boolean;
  error?: string;
  data?: SignupData[];
}

export async function signupForUpdates(
  formData: FormData
): Promise<SignupResult> {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  // Validate required fields
  if (!firstName || !lastName || !email || !phone) {
    return { success: false, error: "All fields are required" };
  }

  // Validate email
  if (!email.includes("@")) {
    return { success: false, error: "Please enter a valid email address" };
  }

  // Validate phone
  const phoneRegex = /^[+]?[1-9][\d\s\-().]{0,15}$/;
  if (!phoneRegex.test(phone)) {
    return { success: false, error: "Please enter a valid phone number" };
  }

  try {
    const signupData = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      marketing_consent: true,
    };

    const result = await insertSignup(signupData);

    return { success: true, data: result };
  } catch (error) {
    console.error("Signup error:", error);

    if (error instanceof Error) {
      switch (error.message) {
        case "DUPLICATE_EMAIL":
          return {
            success: false,
            error: "This email is already registered for updates",
          };
        case "AUTH_ERROR":
          return {
            success: false,
            error: "Authentication failed. Please try again.",
          };
        case "PERMISSION_ERROR":
          return {
            success: false,
            error: "Permission denied. Please try again.",
          };
        default:
          if (error.message.startsWith("DATABASE_ERROR")) {
            return {
              success: false,
              error: "Database error. Please try again later.",
            };
          }
      }
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
