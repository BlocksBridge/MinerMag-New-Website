import { createTransport } from "nodemailer";

export async function sendEmail(receiverEmail, subject, body) {
  const transporter = createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: { user: "no-reply@backend.theminermag.com", pass: "@3T5$M^Tsbwq" },
  });

  let resp = await new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: "no-reply@backend.theminermag.com",
        to: receiverEmail,
        subject: subject,
        html: body,
      },
      (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      }
    );
  });
  return resp;
}
