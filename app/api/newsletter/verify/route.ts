import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
const { v4: uuidv4 } = require("uuid");
import { cookies } from "next/headers";
import { sendEmail } from "@/lib/emailer";
// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!!,
  process.env.SUPABASE_ANON_KEY! // Use service role key for admin operations
);
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const verifyCode = searchParams.get("verification");
  if (email && verifyCode) {
    const { data: user, error } = await supabase
      .from("newsletter_users")
      .select("*")
      .eq("email", email);

    if (user?.length) {
      if (user[0].email_verification_code == verifyCode) {
        const { data: user, error } = await supabase
          .from("newsletter_users")
          .update({ email_verified: true, email_verification_code: null })
          .eq("email", email);
        if (error) {
          return NextResponse.json({
            error: "Something went wrong",
          });
        }
        return NextResponse.json(
          {
            message:
              "Verified, Please refresh your TheMinerMag Account Dashboard",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "Please check Email or Verification Code again!" },
          { status: 402 }
        );
      }
    } else {
      return NextResponse.json({ error: "User Not Found" }, { status: 401 });
    }
  } else {
    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const verification_key = uuidv4();

  const userEmail = cookieStore.get("auth_email");
  console.log(userEmail);
  if (userEmail) {
    const { data: user, error } = await supabase
      .from("newsletter_users")
      .select("*")
      .eq("email", userEmail.value);

    if (error) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 401 }
      );
    }

    if (user[0].email_verified) {
      return NextResponse.json({ verified: true, status: 200 });
    }
    const check = await supabase
      .from("newsletter_users")
      .update({ email_verification_code: verification_key })
      .eq("email", userEmail.value);
    let userLink = `${process.env.NEXT_PUBLIC_website_url}/api/newsletter/verify?email=${userEmail.value}&verification=${verification_key}`;
    let sendVerification = await fetch(
      `${process.env.email_server}/sendEmail`,
      {
        method: "POST",
        body: JSON.stringify({
          email: userEmail.value,
          subject: "Verification Link For TheMinerMag Account",
          message: `<h4>Please Click on the verification link to verify your TheMinerMag Account: <a href="${userLink}">Verify</a></h4>\n<h5>If The Link Above Doesnt Work, Here's a direct link:  <a href="${userLink}">${userLink}</a></h5>`,
        }),
      }
    ).then((res) => res.json());

    return NextResponse.json({ message: "Verification Sent", status: 200 });
  } else {
    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  }
}
