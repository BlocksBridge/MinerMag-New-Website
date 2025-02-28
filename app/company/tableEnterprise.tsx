"use client";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

export default function ComsDA({ data }) {
  ModuleRegistry.registerModules([AllCommunityModule]);

  let cols = [
    {
      field: "symbol",
      headerName: "Name",
      sortable: false,
      cellRenderer: (props) => {
        // put the value in bold
        return (
          <Link target="_blank" href={`/company/${props.value.toUpperCase()}`}>
            {props.value}
          </Link>
        );
      },
    },
    { field: "enterpriseValue", headerName: "Enterprise Value ($)" },
    {
      field: "realizedHash.price",
      headerName: `Realized Hashrate (${data[0].realizedHash.month})`,
    },
    {
      field: "priceHashratio.price",
      headerName: `Price-to-Hash Ratio ($/TH/s) (${data[0].priceHashratio.month})`,
    },
    { field: "bitcoinHolding", headerName: "Holdings (BTC)" },
    {
      field: "realizationRate.price",
      headerName: `Realization Rate (${data[0].realizationRate.month})`,
    },
  ];
  let rowDefs = data;
  console.log(data);
  return (
    <div className=" mt-5 h-[500px]">
      <AgGridReact columnDefs={cols} rowData={rowDefs} />
    </div>
  );
}
