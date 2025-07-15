import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Ensure Prisma runs in Node.js runtime (NOT Edge)
export const runtime = "nodejs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  console.log("📥 Received POST request at /api/signup");

  try {
    const { firstName, lastName, email, phone } = await req.json();

    console.log("📝 Parsed JSON body:", { firstName, lastName, email, phone });

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      console.warn("⚠️ Missing required fields");
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    // Create the signup entry
    const result = await prisma.signup.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
      },
    });

    console.log("✅ Successfully inserted record:", result);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    let message = "Database error";
    if (error instanceof Error) {
      message = error.message;
    }

    console.error("❌ Error inserting into DB:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
