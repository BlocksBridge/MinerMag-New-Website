"use client";
import { MarketData, MarketOverview } from "react-ts-tradingview-widgets";
import "./[company]/tradingView.css";
import Link from "next/link";
export default function ConsolidatedCompanies() {
  const companies = [
    "MARA",
    "RIOT",
    "CORZ",
    "BTDR",
    "CLSK",
    "IREN",
    "HUT",
    "WULF",
    "PHX",
    "CIFR",
    "FUFU",
    "BITF",
    "BTBT",
    "CAN",
    "CANG",
    "HIVE",
    "SDIG", // To be removed once merger with Bitfarms is complete
    "ARBK",
    "BTCM",
    "GRYP",
    "SOS",
    "SLNH",
    "GREE",
    "LMFA",
    "MIGI",
    "BTOG",
    "DGHI",
    "DMGI",
    "ANY",
    "NB2",
  ];
  return (
    <div className="my-10 m-auto flex justify-center items-center w-5/6">
      <MarketData
        colorTheme="dark"
        width={"100%"}
        height={500}
        symbolsGroups={[
          {
            name: "Main",
            symbols: companies.map((i) => {
              return { name: i, displayName: i };
            }),
          },
        ]}></MarketData>
    </div>
  );
}
