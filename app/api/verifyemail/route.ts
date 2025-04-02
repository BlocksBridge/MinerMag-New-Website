import { NextResponse, NextRequest } from "next/server";
import {createTransport} from "nodemailer"
export async function POST() {
    const transporter = createTransport({host: 'smtp.zoho.in',port: 465, secure: true
        ,auth: {user: "no-reply@backend.theminermag.com", pass: "@3T5$M^Tsbwq"}})

    let checkEmailSent = await transporter.sendMail({ to: "shubhamvishwakarma504@gmail.com", subject: "mail works", text: "this is your otp: 30239"})

    console.log("Message sent: %s", checkEmailSent.messageId, checkEmailSent);
    return NextResponse.json(checkEmailSent)
}