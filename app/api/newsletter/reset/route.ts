import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import cookies from next/headers
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,

  process.env.SUPABASE_ANON_KEY! // Use service role key for admin operations

);

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const cookieStore = await cookies();
  let getEmail = cookieStore.get("auth_email");
  if (getEmail && body.password) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    const { data: user, error: fetchError } = await supabase
      .from("newsletter_users") // Replace 'users' with your actual table name
      .update({ password: hashedPassword })
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
