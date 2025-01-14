"use client";

import {
  FundamentalData,
  MiniChart,
  SingleTicker,
  SymbolInfo,
  TechnicalAnalysis,
} from "react-ts-tradingview-widgets";

export default function TradingView({ symbol }) {
  return (
    <div className="flex flex-col gap-2">
      <SymbolInfo
        symbol={symbol}
        colorTheme="light"
        autosize={true}></SymbolInfo>{" "}
      <div className="flex gap-2">
        <TechnicalAnalysis symbol={symbol}></TechnicalAnalysis>
        <FundamentalData symbol={symbol}></FundamentalData>
      </div>
    </div>
  );
}
