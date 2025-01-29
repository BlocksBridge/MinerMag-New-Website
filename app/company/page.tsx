"use client";
// import { MarketData, MarketOverview } from "react-ts-tradingview-widgets";
import { useEffect, useState } from "react";
import "./[company]/tradingView.css";
import Link from "next/link";
import CompanyTable from "./companyTable";
export default function ConsolidatedCompanies() {
  const [currentTab, setCurrentTab] = useState("");
  const [MarketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    (async () => {
      setLoading(true);
      let getIndivisualData = await Promise.all(
        companies.map(async (i) => {
          let call = await fetch(
            `https://financialmodelingprep.com/api/v3/quote-order/${i}?apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb`
          ).then((res) => res.json());

          return call[0];
        })
      );
      setMarketData(getIndivisualData);
      setLoading(false);
    })();
  }, []);

  if (!loading && MarketData.length) {
    console.log(MarketData);
    console.log("called");

    return (
      <div className="my-10 m-auto flex justify-center flex-col items-center gap-8 w-5/6">
        {/* <MarketData
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
        ]}></MarketData> */}
        <h1 className="font-bold"> Bitcoin Mining Companies Stats</h1>

        <CompanyTable data={MarketData} />
      </div>
    );
  }
}
