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
      <div className="flex gap-2">
        <div className="flex-grow">
          <FundamentalData symbol={symbol}></FundamentalData>{" "}
        </div>
        <div className="bg-white border-l-2 rounded-lg p-6 mb-8 ">
          <h3 className="text-xl font-semibold mb-4">Company Summary</h3>

          <div className="gap-4 ">
            <CompanyProfile symbol={symbol}></CompanyProfile>
            {/* <div className="flex flex-col gap-2">
              {Object.keys(formattedQuery).map((item) => {
                return (
                  <p>
                    <strong className="capitalize">{item}:</strong>{" "}
                    {formattedQuery[item]}
                  </p>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
