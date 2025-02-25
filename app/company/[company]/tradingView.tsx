"use client";

// import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import "./tradingView.css";
import { usePathname, useRouter } from "next/navigation";
// export default function TradingView() {

//   return (
//     <div className="p-2  w-full h-full">
//       <AdvancedRealTimeChart
//         hide_side_toolbar={true}
//         allow_symbol_change={false}
//         // hide_legend={true}
//         range="6M"
//         symbol={searchParms.split("/")[searchParms.split("/").length - 1]}
//         theme="light"
//         height={"100%"}
//         width={"100%"}></AdvancedRealTimeChart>
//     </div>
//   );
// }
// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const container = useRef();
  const searchParms = usePathname();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${
            searchParms.split("/")[searchParms.split("/").length - 1]
          }",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "hide_top_toolbar": true,
          "allow_symbol_change": false,
          "save_image": false,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div
      className="tradingview-widget-container "
      ref={container}
      style={{ height: "100%", width: "100%" }}>
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
