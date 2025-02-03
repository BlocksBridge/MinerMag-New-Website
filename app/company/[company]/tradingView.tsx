"use client";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { useState } from "react";
import "./tradingView.css";
export default function TradingView({ symbol }) {
  const [ge, set] = useState("");
  return (
    <div className="p-2  w-full h-full">
      <AdvancedRealTimeChart
        hide_side_toolbar={true}
        allow_symbol_change={false}
        // hide_legend={true}
        range="6M"
        symbol={symbol}
        theme="light"
        height={"100%"}
        width={"100%"}></AdvancedRealTimeChart>
    </div>
  );
}
