import { NextResponse, NextRequest } from "next/server";
import { compare } from "bcrypt";
import { database } from "@/lib/db";
export async function POST(response: NextRequest, request: NextResponse) {
  const body: { email; otp } = await response.json();

  if (body.email && body.otp) {
    let checkEmail = await database.from("emails").select("email", body.email);
    if (!checkEmail.error && checkEmail.data.length) {
      if (checkEmail.data[0].OTP == body.otp) {
        let updateStatus = await database
          .from("emails")
          .update({ verified: true })
          .eq("email", body.email);
        return NextResponse.json({ error: null, verified: true });
      } else {
        return NextResponse.json({ error: null, verified: false });
      }
    }
  } else {
    return NextResponse.json({ error: "required parameters missing" });
  }
}
