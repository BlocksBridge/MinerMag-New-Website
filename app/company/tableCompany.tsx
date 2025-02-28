"use client";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

export default function ComsDA({ data }) {
  ModuleRegistry.registerModules([AllCommunityModule]);
  console.log(data, "DATA");
  let cols = [
    {
      field: "name",
      headerName: "Name",
      sortable: false,
      cellRenderer: (props) => {
        console.log(props.data.symbol, "prp");
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
    { field: "marketCap", headerName: "Market Cap ($)" },
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
