"use client";
import dynamic from "next/dynamic";
export default dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.TickerTape),
  {
    ssr: false,
  }
);
