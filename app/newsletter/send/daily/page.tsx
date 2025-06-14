"use client";
import { render, pretty } from "@react-email/components";
import { useState, useEffect } from "react";
import VercelInviteUserEmail from "@/lib/emailTemplates/Daily";

export default function Page() {
  const currentDate = new Date();
  const [getPosts, setData] = useState([]);
  const [networkData, setnetwork] = useState([]);
  const [htmlss, setHTML] = useState("");
  const publishDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const publishTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  useEffect(() => {
    (async () => {
      const getPostss: [any] = await fetch(
        `https://backend.theminermag.com/wp-json/wp/v2/posts?acf_format=standard&_=${Date.now()}`
      ).then((res) => res.json());
      setData(getPostss);
      const getNetworkData = await fetch(`/api/networkdata`)
        .then((res) => res.json())
        .then((data) => data.data);

      setnetwork(getNetworkData);
      const emailHTML = await pretty(
        await render(
          <VercelInviteUserEmail
            getPosts={getPostss}
            networkData={getNetworkData}
          />
        )
      );
      setHTML(emailHTML);
      await fetch(`/api/newsletter/dailyNews`, {
        method: "POST",
        body: JSON.stringify({ html: emailHTML }),
      });
    })();
  }, []);

  if (htmlss.length) {
    console.log(networkData, htmlss);
    return <h1>Hey</h1>;
  }
}
