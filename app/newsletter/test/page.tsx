import { render } from "@react-email/render";

import WeeklyNewsletterTemplate from "@/lib/emailTemplates/Weekly";
export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { test: undefined | string };
}) {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - 7);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(currentDate.getDate());
  if ((await searchParams).test) {
    await fetch(`${process.env.email_server}/sendEmail`, {
      method: "POST",
      body: JSON.stringify({
        email: "shubham@blocksbridge.com",
        subject: "Miner Weekly",
        message: email,
      }),
    }).then((res) => res.json());
  }

  const posts: [any] = await fetch(
    `${
      process.env.NEXT_PUBLIC_backend_url
    }/wp-json/wp/v2/posts?acf_format=standard&_=${Date.now()}&before=${new Date(
      endOfWeek
    ).toISOString()}&after=${new Date(startOfWeek).toISOString()}`
  ).then((res) => res.json());

  const getNetworkData = await fetch(
    `${process.env.NEXT_PUBLIC_website_url}/api/networkdata`
  )
    .then((res) => res.json())
    .then((data) => data.data);
  const email = await render(
    WeeklyNewsletterTemplate({
      posts,
      networkData: getNetworkData,
      startWeek: startOfWeek,
      endWeek: endOfWeek,
      backendUrl: process.env.NEXT_PUBLIC_backend_url!,
      frontendUrl: process.env.NEXT_PUBLIC_website_url!,
    })
  );

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: email }}></div>
    </div>
  );
}
