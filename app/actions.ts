"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: {
    name?: string;
    email?: string;
    message?: string;
  };
};

export async function submitContact(
  prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const errors: ContactState["errors"] = {};

  if (!name) {
    errors.name = "Please enter your name.";
  }

  if (!email) {
    errors.email = "Please enter your email.";
  } else if (!email.includes("@")) {
    errors.email = "Please enter a valid email.";
  }

  if (!message) {
    errors.message = "Please enter a message.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      errors,
    };
  }

  try {
    await resend.emails.send({
      from: "Contact Form Submission <contact@winnieswim.com>",
      to: "winnieswim@winnieswim.com",
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `
New WinnieSwim contact form submission

Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New WinnieSwim Contact Form Submission</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return {
      status: "success",
      message: "Thank you for reaching out. We will get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form email error:", error);

    return {
      status: "error",
      message: "Something went wrong. Please try again later.",
    };
  }
}
