import { NextResponse, NextRequest } from "next/server";
import { createTransport } from "nodemailer";
import { sendEmail } from "@/lib/emailer";
import { database } from "@/lib/db";
export async function POST(response: NextRequest, request: NextResponse) {
  const body: { email; company } = await response.json();
  if (body.email && body.company) {
    let generatedCode = String(Math.floor(100000 + Math.random() * 900000));
    let pendingEmail = await database.from("emails").insert({
      email: body.email,
      purpose: "Downloading Report",
      company: body.company,
      verified: false,
      OTP: generatedCode,
    });
    if (pendingEmail.status == 200) {
      let checkEmailSent = await sendEmail(
        body.email,
        "Authentication Password For Downloading Report",
        `OTP For Downloading Report: ${generatedCode}`
      );
      console.log("Message sent: %s", checkEmailSent);
      return NextResponse.json({ error: null, status: "Success" });
    } else {
      return NextResponse.json({ error: "try again after sometime" });
    }
  } else {
    return NextResponse.json({ error: "required parameters missing" });
  }
}
