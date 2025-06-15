import { NewsletterfilterEmails, sendEmail } from "@/lib/emailer";
import { render, pretty } from "@react-email/render";
import DailyDigest from "@/lib/emailTemplates/Daily";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,

  process.env.SUPABASE_ANON_KEY! // Use service role key for admin operations
);
export async function POST(req: NextRequest) {
  // const WeeklyTemplate = await pretty(await render(createElement(Weekly)));
  // const MonthlyTemplate = await pretty(await render(createElement(Monthly)));
  //   let sendTest = await sendEmail(
  //
  //     message: html
  //   );
  const getData = await supabase
    .from("newsletter_users")
    .select("*")
    .eq("email_verified", true);

  const getPosts: [any] = await fetch(
    `${
      process.env.NEXT_PUBLIC_backend_url
    }/wp-json/wp/v2/posts?acf_format=standard&_=${Date.now()}`
  ).then((res) => res.json());

  const getNetworkData = await fetch(
    `${process.env.NEXT_PUBLIC_website_url}/api/networkdata`
  )
    .then((res) => res.json())
    .then((data) => data.data);

  if (getData.error == null && getData.data) {
    const emailHTML = await render(
      DailyDigest({ getPosts, networkData: getNetworkData })
    );
    const users = NewsletterfilterEmails(getData.data, "Daily Digest");
    await Promise.resolve(
      users.map(async (mail) => {
        let bulkSend = await fetch(`${process.env.email_server}/sendEmail`, {
          method: "POST",
          body: JSON.stringify({
            email: mail,
            subject: "Breaking News",
            message: emailHTML,
          }),
        }).then((res) => res.json());
        return bulkSend;
      })
    );

    return NextResponse.json({ sent: users.length });
  } else {
    return NextResponse.json({
      error: getData.error ? getData.error : `Body Missing HTML`,
    });
  }
}
