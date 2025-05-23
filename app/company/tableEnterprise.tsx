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

  // Cell renderer for n/a values
  let MinerMagCellRender = (props) => {
    if (props.value == undefined) {
      return <>n/a</>;
    } else {
      return <>{props.value}</>;
    }
  };

  // Define columns based on screen size
  const desktopColumns = [
    {
      field: "symbol",
      headerName: "Name",
      sortable: false,
      flex: 1,
      minWidth: 100,
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
      flex: 1,
      minWidth: 150,
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
      headerName: `Realized Hashrate (${data[0]?.realizedHash?.month || ""})`,
      filter: true,
      flex: 1,
      minWidth: 150,
      cellRenderer: MinerMagCellRender,
    },
    {
      field: "priceHashratio.price",
      flex: 1,
      minWidth: 150,
      headerName: `Price-to-Hash Ratio ($/TH/s) (${
        data[0]?.priceHashratio?.month || ""
      })`,
      filter: true,
      cellRenderer: MinerMagCellRender,
    },
    {
      field: "bitcoinHolding",
      flex: 1,
      minWidth: 120,
      filter: true,
      headerName: "Holdings (BTC)",
      cellRenderer: MinerMagCellRender,
    },
    {
      field: "realizationRate.price",
      flex: 1,
      minWidth: 150,
      filter: true,
      headerName: `Realization Rate (${data[0]?.realizationRate?.month || ""})`,
      cellRenderer: MinerMagCellRender,
    },
  ];

  const mobileColumns = [
    {
      field: "symbol",
      headerName: "Name",
      sortable: false,
      flex: 1,
      minWidth: 80,
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
      headerName: "Ent. Value",
      filter: true,
      flex: 1,
      minWidth: 100,
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
      field: "bitcoinHolding",
      flex: 1,
      minWidth: 90,
      filter: true,
      headerName: "BTC",
      cellRenderer: MinerMagCellRender,
    },
  ];

  // State for column definitions
  const [columnDefs, setColumnDefs] = useState(desktopColumns);

  // Function to handle resize
  const handleResize = useCallback(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setColumnDefs(desktopColumns);

    // Force grid to refresh with new columns
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.setColumnDefs(
        mobile ? mobileColumns : desktopColumns
      );
      gridRef.current.api.sizeColumnsToFit();
    }
  }, [data]);

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
    <>
      <div className="mt-5 h-[500px] w-full">
        <div className="ag-theme-alpine h-[500px] w-full">
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            rowData={data}
            onGridReady={onGridReady}
            domLayout="normal"
            defaultColDef={{
              resizable: true,
              sortable: true,
            }}
          />
        </div>
      </div>
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
