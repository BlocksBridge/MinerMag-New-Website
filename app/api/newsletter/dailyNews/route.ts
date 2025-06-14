import { sendEmail } from "@/lib/emailer";
import { render, pretty } from "@react-email/render";
import Daily from "@/lib/emailTemplates/Daily";
import Weekly from "@/lib/emailTemplates/Weekly";
import Monthly from "@/lib/emailTemplates/Monthly";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,

  process.env.SUPABASE_ANON_KEY! // Use service role key for admin operations
);
export async function POST(req: NextRequest) {
  let body = await req.json();
  // const WeeklyTemplate = await pretty(await render(createElement(Weekly)));
  // const MonthlyTemplate = await pretty(await render(createElement(Monthly)));
  //   let sendTest = await sendEmail(
  //
  //     message: html
  //   );
  const getData = await supabase.from("newsletter_users").select("email");
  if (getData.error == null && getData.data && body.html) {
    const users = getData.data;

    await Promise.resolve(
      users.map(async (mail) => {
        let h = await fetch(`${process.env.email_server}/sendEmail`, {
          method: "POST",
          body: JSON.stringify({
            email: mail.email,
            subject: "Breaking News",
            message: body.html,
          }),
        }).then((res) => res.json());
        return h;
      })
    );
    console.log("done");
    return NextResponse.json({ hey: users });
  } else {
    return NextResponse.json({
      error: getData.error ? getData.error : `Body Missing HTML`,
    });
  }
}
