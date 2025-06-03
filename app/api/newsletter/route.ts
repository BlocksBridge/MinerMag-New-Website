import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import cookies from next/headers
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY! // Use service role key for admin operations
);
export async function GET(request: NextRequest, response: NextResponse) {
  const cookieStore = await cookies();
  let getEmail = cookieStore.get("auth_email");
  if (getEmail) {
    const { data: user, error: fetchError } = await supabase
      .from("newsletter_users") // Replace 'users' with your actual table name
      .select("email_preferences, email_verified, email ")
      .eq("email", getEmail.value.toLowerCase());

    if (fetchError || !user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    console.log(user, getEmail);
    return NextResponse.json({
      ...user[0],
      email_preferences: user[0].email_preferences,
    });
  } else {
    return NextResponse.json({ error: "Unauthorized Access" });
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const cookieStore = await cookies();
  let getEmail = cookieStore.get("auth_email");
  if (getEmail && body.email_preferences) {
    const { data: user, error: fetchError } = await supabase
      .from("newsletter_users") // Replace 'users' with your actual table name
      .update({ email_preferences: body.email_preferences })
      .eq("email", getEmail.value.toLowerCase());

    if (fetchError) {
      return NextResponse.json({ error: "User doesnt exist" }, { status: 401 });
    }

    return NextResponse.json({
      stauts: 200,
      message: "Updated",
    });
  } else {
    return NextResponse.json({ error: "Unauthorized Access" });
  }
}
