import { NextResponse, NextRequest } from "next/server";
import {createTransport} from "nodemailer"
export async function POST(response: NextRequest, request: NextResponse) {
    const body: {email, otp}= await response.json()

    if (body.email && body.otp) {
    const transporter = createTransport({host: 'smtp.zoho.in',port: 465, secure: true
        ,auth: {user: "no-reply@backend.theminermag.com", pass: "@3T5$M^Tsbwq"}})

    let checkEmailSent = await transporter.sendMail({ from: "no-reply@backend.theminermag.com" , to:body.email, subject: "Authentication Password For Downloading Report", text: `OTP For Downloading Report: ${body.otp}`})

    console.log("Message sent: %s", checkEmailSent.messageId, checkEmailSent);    return NextResponse.json(checkEmailSent) } else {
        return NextResponse.json({error: "required parameters missing"})
    }

}