"use server";

import { insertSignup } from "@/lib/supabase";

export async function signupForUpdates(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  console.log("Signup attempt for:", email);

  // Validate the data
  if (!firstName || !lastName || !email || !phone) {
    return { success: false, error: "All fields are required" };
  }

  if (!email.includes("@")) {
    return { success: false, error: "Please enter a valid email address" };
  }

  // Basic phone validation
  const phoneRegex = /^[+]?[1-9][\d\s\-()]{0,15}$/;
  if (!phoneRegex.test(phone)) {
    return { success: false, error: "Please enter a valid phone number" };
  }

  try {
    // For now, let's skip the email check and just try to insert
    // We'll handle duplicate emails with the database constraint
    const signupData = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      marketing_consent: true,
    };

    console.log("Attempting to insert signup:", signupData);
    const result = await insertSignup(signupData);

    console.log("New signup saved:", result);
    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);

    // Check if it's a duplicate email error
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return {
        success: false,
        error: "This email is already registered for updates",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
