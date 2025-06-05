import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // Import cookies from next/headers

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!!,
  process.env.SUPABASE_ANON_KEY!! // Use service role key for admin operations
);

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate password strength
function validatePassword(password) {
  const requirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isValid = Object.values(requirements).every((req) => req);
  return { isValid, requirements };
}

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return Response.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Validate name (minimum length)
    if (name.trim().length < 2) {
      return Response.json(
        { error: "Name must be at least 2 characters long" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return Response.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return Response.json(
        {
          error:
            "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character",
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("newsletter_users") // Updated to match your login route table name
      .select("id, email")
      .eq("email", email.toLowerCase())
      .single();

    if (existingUser) {
      return Response.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // If fetchError is not null and it's not a "no rows" error, handle it
    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Database error:", fetchError);
      return Response.json(
        { error: "Database error occurred" },
        { status: 500 }
      );
    }

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const { data: newUser, error: insertError } = await supabase
      .from("newsletter_users") // Updated to match your login route table name
      .insert([
        {
          name: String(name),
          email: email.toLowerCase(),
          password: hashedPassword,

          email_preferences: {
            newsletters: [
              {
                id: 1,
                name: "Daily Digest",
                description: "Top stories delivered every morning",
                subscribed: true,
              },
              {
                id: 2,
                name: "Breaking News",
                description: "Important updates as they happen",
                subscribed: true,
              },
              {
                id: 3,
                name: "Weekly Roundup",
                description: "A summary of the week's top stories",
                subscribed: true,
              },
            ],
            email_paused: false,
          },
        },
      ])
      .select("id, name, email, created_at")
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);

      // Handle specific database errors
      if (insertError.code === "23505") {
        // Unique constraint violation
        return Response.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        );
      }

      return Response.json(
        { error: "Failed to create account. Please try again." },
        { status: 500 }
      );
    }

    // Generate JWT token for automatic login
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        name: newUser.name,
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
    (await cookieStore).set("auth_email", newUser.email, {
      httpOnly: true, // Crucial: prevents client-side JavaScript access
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "lax", // Recommended for CSRF protection
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds (matches JWT expiry)
      path: "/", // Cookie accessible from all paths
    });
    // Return success response with token for automatic login
    return Response.json(
      {
        message: "Account created successfully",
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          created_at: newUser.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
