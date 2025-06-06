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
    // Check if user exists in database
    const { data: user, error: fetchError } = await supabase
      .from("newsletter_users")
      .select("*")
      .eq("email", getEmail.value.toLowerCase())
      .single();

    if (fetchError || !user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if password matches using bcrypt
    const passwordMatch = await bcrypt.compare(body.password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const { data: deletedUser, error: fetchErrors } = await supabase
      .from("newsletter_users") // Replace 'users' with your actual table name
      .delete()
      .eq("email", getEmail.value.toLowerCase());
    if (fetchError) {
      return NextResponse.json({
        stauts: 401,
        message: "Error Deleting Email",
      });
    }
    return NextResponse.json({
      stauts: 200,
      message: "Deleted",
    });
  } else {
    return NextResponse.json({ error: "Unauthorized Access" });
  }
}
