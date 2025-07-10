import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Check environment variables
  const envCheck = {
    supabaseUrl: supabaseUrl ? "Set" : "Missing",
    supabaseKey: supabaseKey ? "Set" : "Missing",
  };

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({
      success: false,
      error: "Environment variables missing",
      env: envCheck,
    });
  }

  // Test connection
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/signups?limit=1`, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: "Supabase connection working",
        env: envCheck,
      });
    } else {
      const errorText = await response.text();
      return NextResponse.json({
        success: false,
        error: `Connection failed: ${response.status}`,
        details: errorText,
        env: envCheck,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      env: envCheck,
    });
  }
}
