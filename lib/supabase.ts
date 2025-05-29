// Supabase client using fetch API
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export type SignupData = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at?: string;
  shopify_customer_id?: string | null;
  marketing_consent?: boolean;
};

export async function insertSignup(
  data: Omit<SignupData, "id" | "created_at">
) {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/signups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase insert error:", response.status, errorText);
      throw new Error(`Failed to save signup: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Insert signup error:", error);
    throw error;
  }
}

export async function checkEmailExists(email: string) {
  try {
    console.log("Checking email:", email);
    console.log("Supabase URL:", supabaseUrl);

    const response = await fetch(
      `${supabaseUrl}/rest/v1/signups?email=eq.${encodeURIComponent(
        email
      )}&select=email`,
      {
        method: "GET",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase check email error:", response.status, errorText);
      throw new Error(`Failed to check email: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log("Email check result:", data);
    return data.length > 0;
  } catch (error) {
    console.error("Check email error:", error);
    throw error;
  }
}
