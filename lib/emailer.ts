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

export function NewsletterfilterEmails(
  emails: {
    email: string;
    email_preferences: {
      newsletters: { name: string; subscribed: boolean }[]; // Corrected: Array of objects
    };
  }[], // Corrected: Array of email objects
  newsletterType: string
): string[] {
  return emails
    .filter((user) => {
      let checkSubscribed = false;
      for (let x = 0; x < user.email_preferences.newsletters.length; x++) {
        let newsletter = user.email_preferences.newsletters[x];
        if (
          newsletter.name == newsletterType &&
          newsletter.subscribed == true
        ) {
          checkSubscribed = true;
          break;
        }
      }
      return checkSubscribed;
    })
    .map((item) => item.email);
}
