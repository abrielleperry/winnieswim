import { put } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Check file size (optional - Vercel Blob can handle large files)
    const maxSize = 500 * 1024 * 1024; // 500MB limit
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large (max 500MB)" },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const blob = await put(`hero-videos/${file.name}`, file, {
      access: "public",
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
