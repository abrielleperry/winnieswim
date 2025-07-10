// Production Supabase client
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
): Promise<SignupData[]> {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase configuration missing");
  }

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

    // Handle specific error cases
    if (response.status === 409 || errorText.includes("duplicate key")) {
      throw new Error("DUPLICATE_EMAIL");
    }

    if (response.status === 401) {
      throw new Error("AUTH_ERROR");
    }

    if (response.status === 403) {
      throw new Error("PERMISSION_ERROR");
    }

    console.error(`Supabase error: ${response.status} - ${errorText}`);
    throw new Error(`DATABASE_ERROR: ${response.status}`);
  }

  return (await response.json()) as SignupData[];
}

export async function checkEmailExists(email: string): Promise<boolean> {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase configuration missing");
  }

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

  if (!response.ok) {
    throw new Error(`Failed to check email: ${response.status}`);
  }

  const data = await response.json();
  return data.length > 0;
}
