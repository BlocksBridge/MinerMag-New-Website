"use client";

import {
  MiniChart,
  SingleTicker,
  TechnicalAnalysis,
} from "react-ts-tradingview-widgets";

export default function TradingView({ symbol }) {
  return (
    <div className="flex gap-2">
      <MiniChart symbol={symbol}></MiniChart>
      <TechnicalAnalysis height={300} symbol={symbol}></TechnicalAnalysis>
    </div>
  );
}
