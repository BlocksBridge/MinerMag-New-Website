import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/lib/emailer";
import { database } from "@/lib/db";
export async function POST(response: NextRequest, request: NextResponse) {
  const body: { email; company; postTitle; postDate } = await response.json();
  console.log(body);
  if (body.email && body.company && body.postTitle && body.postDate) {
    let saveEmail = await database.from("emails").upsert({
      email: body.email,
      company: body.company,
      purpose: "Newsletter",
    });

    if (saveEmail.error == null) {
      const getPost = await fetch(
        `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/posts?acf_format=standard&slug=${body.postTitle}&date=${body.postDate}`
      ).then((res) => res.json());
      console.log(getPost[0].acf.upload_report, "from server");
      let sendReportLink = await sendEmail(
        body.email,
        `Here's Your Report From TheMinerMag's Article: ${body.postTitle}`,
        `<h4>Here's Your Report For ${body.postTitle}: <a href="${getPost[0].acf.upload_report}">Report</a></h4> <br><br><p>If you can't access the hyperlink above, here's a direct link: ${getPost[0].acf.upload_report}</p>`
      );

      console.log(sendReportLink);
      return NextResponse.json({ error: null, status: 200 });
    }
  } else {
    return NextResponse.json({ error: "required parameters missing" });
  }

  return NextResponse.json({ error: null, status: 200 });
}
