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
      flex: 1,
      cellRenderer: (props) => {
        return (
          <Link
            className="text-blue-600 hover:text-blue-800 font-medium"
            target="_blank"
            href={`/company/${props.data.symbol.toUpperCase()}`}>
            {props.value}
          </Link>
        );
      },
    },
    { field: "price", headerName: "Price ($)", flex: 1, filter: true },
    {
      field: "marketCap",
      headerName: "Market Cap ($)",
      flex: 1,
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
    },
    { field: "dayHigh", headerName: "1D H ($)", flex: 1, filter: true },
    { field: "dayLow", headerName: "1D L ($)", flex: 1, filter: true },
    { field: "volume", headerName: "Volume", flex: 1, filter: true },
  ];

  let rowDefs = data;

  return (
    <div className="mt-5 h-[500px]">
      <AgGridReact columnDefs={cols} rowData={rowDefs} />
    </div>
  );
}
