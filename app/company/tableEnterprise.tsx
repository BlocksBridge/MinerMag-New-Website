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
      cellRenderer: (props) => {
        return (
          <Link target="_blank" href={`/company/${props.value.toUpperCase()}`}>
            {props.value}
          </Link>
        );
      },
    },
    {
      field: "enterpriseValue",
      headerName: "Enterprise Value ($)",
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
    },
    {
      field: "realizedHash.price",
      headerName: `Realized Hashrate (${data[0].realizedHash.month})`,
      cellRenderer: MinerMagCellRender,
    },
    {
      field: "priceHashratio.price",
      headerName: `Price-to-Hash Ratio ($/TH/s) (${data[0].priceHashratio.month})`,
      cellRenderer: MinerMagCellRender,
    },
    {
      field: "bitcoinHolding",
      headerName: "Holdings (BTC)",
      cellRenderer: MinerMagCellRender,
    },
    {
      field: "realizationRate.price",
      headerName: `Realization Rate (${data[0].realizationRate.month})`,
      cellRenderer: MinerMagCellRender,
    },
  ];
  let rowDefs = data;
  console.log(data);
  return (
    <>
      <div className=" mt-5 h-[500px]">
        <AgGridReact columnDefs={cols} rowData={rowDefs} />
      </div>{" "}
      <div className="text-sm mt-1">
        {" "}
        <p>Legends:</p>
        <p>n/a: n/a: Data not tracked</p>
        <p>0: Data not publicly available for the specified period.</p>
      </div>
    </>
  );
}
