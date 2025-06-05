import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // Import cookies from next/headers

import { NextRequest, NextResponse } from "next/server";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!!,
  process.env.SUPABASE_ANON_KEY! // Use service role key for admin operations
);

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user exists in database
    const { data: user, error: fetchError } = await supabase
      .from("newsletter_users") // Replace 'users' with your actual table name
      .select("*")
      .eq("email", email.toLowerCase())
      .single();

    if (fetchError || !user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if password matches using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        // Add any other user data you want in the token
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d", // Token expires in 7 days
      }
    );
    const cookieStore = cookies();

    (await cookieStore).set("auth_token", token, {
      httpOnly: true, // Crucial: prevents client-side JavaScript access
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "lax", // Recommended for CSRF protection
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds (matches JWT expiry)
      path: "/", // Cookie accessible from all paths
    });
    (await cookieStore).set("auth_email", user.email, {
      httpOnly: true, // Crucial: prevents client-side JavaScript access
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "lax", // Recommended for CSRF protection
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds (matches JWT expiry)
      path: "/", // Cookie accessible from all paths
    });
    // Return success response with token
    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        // Include other safe user data (don't include password)
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
