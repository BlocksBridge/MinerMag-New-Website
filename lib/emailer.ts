import { createTransport } from "nodemailer";
import { SMTPClient } from "emailjs";

export async function sendEmail(receiverEmail, subject, body) {
  const client = new SMTPClient({
    user: "no-reply@backend.theminermag.com",
    password: "@3T5$M^Tsbwq",
    host: "smtp.zoho.in",
    tls: false,
    ssl: true,
  });
  // const transporter = createTransport({
  //   host: "smtp.zoho.in",
  //   port: 465,
  //   secure: true,
  //   auth: { user: "no-reply@backend.theminermag.com", pass: "@3T5$M^Tsbwq" },
  // });
  // let checkEmailSent = await transporter.sendMail(
  //   {
  //     from: "no-reply@backend.theminermag.com",
  //     to: receiverEmail,
  //     subject: subject,
  //     html: body,
  //   },
  //   (err, info) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(info);
  //     }
  //   }
  // );

  try {
    const message = await client.sendAsync({
      text: body,
      from: "no-reply@backend.theminermag.com",
      to: receiverEmail,
      subject: subject,
    });
    console.log(message);
    return message;
  } catch (err) {
    console.error(err);

    return err;
  }
}
