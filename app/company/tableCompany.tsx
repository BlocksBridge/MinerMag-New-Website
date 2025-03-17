"use client";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import numeral from "numeral";
export default function ComsDA({ data }) {
  ModuleRegistry.registerModules([AllCommunityModule]);
  let cols = [
    {
      field: "name",
      headerName: "Name",
      sortable: false,
      cellRenderer: (props) => {
        return (
          <Link
            target="_blank"
            href={`/company/${props.data.symbol.toUpperCase()}`}>
            {props.value}
          </Link>
        );
      },
    },
    { field: "price", headerName: "Price ($)" },
    {
      field: "marketCap",
      headerName: "Market Cap ($)",
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
    { field: "dayHigh", headerName: "1D H ($)" },
    { field: "dayLow", headerName: "1D L ($)" },
    { field: "volume", headerName: "Volume" },
  ];
  let rowDefs = data;
  return (
    <div className=" mt-5 h-[500px]">
      <AgGridReact columnDefs={cols} rowData={rowDefs} />
    </div>
  );
}
