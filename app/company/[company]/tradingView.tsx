"use client";

import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import "./tradingView.css";
import { usePathname, useRouter } from "next/navigation";
export default function TradingView() {
  const searchParms = usePathname();

  return (
    <div className="p-2  w-full h-full">
      <AdvancedRealTimeChart
        hide_side_toolbar={true}
        allow_symbol_change={false}
        // hide_legend={true}
        range="6M"
        symbol={searchParms.split("/")[searchParms.split("/").length - 1]}
        theme="light"
        height={"100%"}
        width={"100%"}></AdvancedRealTimeChart>
    </div>
  );
}
