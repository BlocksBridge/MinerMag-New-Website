"use client";
// import { MarketData, MarketOverview } from "react-ts-tradingview-widgets";
import { useEffect, useState } from "react";
import "./[company]/tradingView.css";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnterpriseTable from "./enterpriseTableOriginal";
import CompanyTable from "./companyTableOriginal";
import { companies } from "../companiesData";
import { TabsContent } from "@radix-ui/react-tabs";
export default function ConsolidatedCompanies() {
  const [currentTab, setCurrentTab] = useState("");
  const [MarketData, setMarketData] = useState([]);
  const [EnterpriseData, setEnterpriseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // let getIndividualMarketData = await Promise.all(
      //   companies.map(async (i) => {
      //     let call = await fetch(
      //       `https://financialmodelingprep.com/api/v3/quote-order/${i}?apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb`
      //     ).then((res) => res.json());

      //     return call[0];
      //   })
      // );
      //       let getIndividualEnterpriseData = await Promise.all(
      //         companies.map(async (i) => {
      //           let call = await fetch(
      //             `      https://financialmodelingprep.com/api/v3/enterprise-values/${i}/?period=quarter&apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb
      // `
      //           ).then((res) => res.json());

      //           return call[0];
      //         })
      //       );
      // setMarketData(getIndividualMarketData);
      // setEnterpriseData(getIndividualEnterpriseData);
      setLoading(false);
    })();
  }, []);

  if (!loading) {
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
        <Tabs className="w-full" defaultValue="index">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="index">Market Cap</TabsTrigger>
            <TabsTrigger value="enterprise">Operations Metrics</TabsTrigger>
          </TabsList>
          <TabsContent value="index">
            <CompanyTable data={[]} companies={companies} />
          </TabsContent>
          <TabsContent value="enterprise">
            {" "}
            <EnterpriseTable data={[]} companies={companies} />
          </TabsContent>{" "}
        </Tabs>
      </div>
    );
  }
}
