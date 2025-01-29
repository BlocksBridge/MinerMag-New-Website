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
    <div className="flex flex-col gap-2">
      <SymbolInfo
        symbol={symbol}
        colorTheme="light"
        autosize={true}></SymbolInfo>{" "}
    </div>
  );
}
