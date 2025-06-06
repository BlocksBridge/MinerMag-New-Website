import { sendEmail } from "@/lib/emailer";
import { render, pretty } from "@react-email/render";
import Daily from "@/lib/emailTemplates/Daily";
import Weekly from "@/lib/emailTemplates/Weekly";
import Monthly from "@/lib/emailTemplates/Monthly";
import { NextRequest, NextResponse } from "next/server";
import { createElement } from "react";
export async function GET(req: NextRequest) {
  const DailyTemplate = await pretty(await render(createElement(Daily)));
  const WeeklyTemplate = await pretty(await render(createElement(Weekly)));
  const MonthlyTemplate = await pretty(await render(createElement(Monthly)));
  //   let sendTest = await sendEmail(
  //
  //     message: html
  //   );
  let users = [
    "shubham@blocksbridge.com",
    "nishant@blocksbridge.com",
    "wolfie@blocksbridge.com",
  ];
  let mails = [DailyTemplate, WeeklyTemplate, MonthlyTemplate];

  await Promise.resolve(
    users.map((mail) => {
      mails.forEach(async (Template) => {
        await fetch(`${process.env.email_server}/sendEmail`, {
          method: "POST",
          body: JSON.stringify({
            email: mail,
            subject: "Newsletter Test",
            message: Template,
          }),
        }).then((res) => res.json());
      });
    })
  );

  return NextResponse.json({ hey: "hey" });
}
