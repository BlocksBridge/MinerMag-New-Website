"use client";

import {
  CompanyProfile,
  FundamentalData,
  MiniChart,
  SingleTicker,
  SymbolInfo,
  TechnicalAnalysis,
} from "react-ts-tradingview-widgets";
import "./tradingView.css";
export default function TradingView({ symbol, formattedQuery }) {
  return (
    <div className="p-2 flex flex-col gap-2 h-full">
      <MiniChart
        symbol={symbol}
        colorTheme="light"
        height={"100%"}
        autosize={true}></MiniChart>{" "}
    </div>
  );
}
