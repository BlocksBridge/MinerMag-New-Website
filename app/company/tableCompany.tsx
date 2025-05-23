"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import numeral from "numeral";

export default function ComsDA({ data }) {
  ModuleRegistry.registerModules([AllCommunityModule]);

  // Create ref for the grid
  const gridRef = useRef();

  // State to track viewport width
  const [isMobile, setIsMobile] = useState(false);

  // Define columns based on screen size
  const desktopColumns = [
    {
      field: "name",
      headerName: "Name",
      sortable: false,
      flex: 1,
      minWidth: 120,
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
    {
      field: "price",
      headerName: "Price ($)",
      flex: 1,
      minWidth: 100,
      filter: true,
    },
    {
      field: "marketCap",
      headerName: "Market Cap ($)",
      flex: 1,
      minWidth: 120,
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
    {
      field: "dayHigh",
      headerName: "1D H ($)",
      flex: 1,
      minWidth: 90,
      filter: true,
    },
    {
      field: "dayLow",
      headerName: "1D L ($)",
      flex: 1,
      minWidth: 90,
      filter: true,
    },
    {
      field: "daysToCover",
      headerName: "Days To Cover ( Short Interest )",
      flex: 1,
      minWidth: 90,
      filter: true,
    },
    {
      field: "volume",
      headerName: "Volume",
      flex: 1,
      minWidth: 100,
      filter: true,
    },
  ];

  const mobileColumns = [
    {
      field: "name",
      headerName: "Name",
      sortable: false,
      flex: 2,
      minWidth: 120,
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
    {
      field: "price",
      headerName: "Price ($)",
      flex: 1,
      minWidth: 90,
      filter: true,
    },
    {
      field: "marketCap",
      headerName: "Mkt Cap",
      flex: 1,
      minWidth: 100,
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
  ];

  // State for column definitions
  const [columnDefs, setColumnDefs] = useState(desktopColumns);

  // Function to handle resize
  const handleResize = useCallback(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setColumnDefs(mobile ? mobileColumns : desktopColumns);

    // Force grid to refresh with new columns
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.setColumnDefs(
        mobile ? mobileColumns : desktopColumns
      );
      gridRef.current.api.sizeColumnsToFit();
    }
  }, []);

  // Add resize listener on component mount
  useEffect(() => {
    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // Callback when grid is ready
  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <div className="mt-5  w-full">
      <div className="ag-theme-alpine ">
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={data}
          domLayout="autoHeight"
          onGridReady={onGridReady}
          defaultColDef={{
            resizable: true,
            sortable: true,
          }}
        />
      </div>
    </div>
  );
}
