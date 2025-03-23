"use client";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import numeral from "numeral";
export default function ComsDA({ data }) {
  ModuleRegistry.registerModules([AllCommunityModule]);
  let MinerMagCellRender = (props) => {
    if (props.value == undefined) {
      return <>n/a</>;
    } else {
      return <>{props.value}</>;
    }
  };
  let cols = [
    {
      field: "symbol",
      headerName: "Name",
      sortable: false,
      flex: 1,
      cellRenderer: (props) => {
        return (
          <Link
            className="text-blue-600 hover:text-blue-800 font-medium"
            target="_blank"
            href={`/company/${props.value.toUpperCase()}`}>
            {props.value}
          </Link>
        );
      },
    },
    {
      field: "enterpriseValue",
      headerName: "Enterprise Value ($)",
      filter: true,
      cellRenderer: (props) => {
        return (
          <>
            {numeral(props.value)
              .format("($ 0.00 a)")
              .replace(" ", "")
              .toUpperCase()}
          </>
        );
      },
      flex: 1,
    },
    {
      field: "realizedHash.price",
      headerName: `Realized Hashrate (${data[0].realizedHash.month})`,
      filter: true,
      flex: 1,
      cellRenderer: MinerMagCellRender,
    },
    {
      field: "priceHashratio.price",
      flex: 1,
      headerName: `Price-to-Hash Ratio ($/TH/s) (${data[0].priceHashratio.month})`,
      filter: true,
      cellRenderer: MinerMagCellRender,
    },
    {
      field: "bitcoinHolding",
      flex: 1,
      filter: true,
      headerName: "Holdings (BTC)",
      cellRenderer: MinerMagCellRender,
    },
    {
      field: "realizationRate.price",
      flex: 1,
      filter: true,
      headerName: `Realization Rate (${data[0].realizationRate.month})`,
      cellRenderer: MinerMagCellRender,
    },
  ];
  let rowDefs = data;
  // console.log(data);
  return (
    <>
      <div className=" mt-5 h-[500px]">
        <AgGridReact columnDefs={cols} rowData={rowDefs} />
      </div>{" "}
      <div className="text-sm mt-3 bg-gray-50 p-3 rounded-md">
        <p className="font-medium mb-1">Legend:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="text-gray-500">n/a</span>: Data not tracked
          </li>
          <li>
            <span className="text-gray-500">0</span>: Data not publicly
            available for the specified period
          </li>
        </ul>
      </div>
    </>
  );
}
