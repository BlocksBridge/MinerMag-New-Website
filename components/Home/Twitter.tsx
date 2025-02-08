"use client";
import { Timeline } from "react-twitter-widgets";
export default function twitteR() {
  return (
    <Timeline
      dataSource={{ sourceType: "profile", screenName: "theminermag_" }}
      options={{ chrome: "noheader, nofooter", height: "600" }}
    />
  );
}
