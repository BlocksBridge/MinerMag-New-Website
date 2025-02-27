"use client";

import * as React from "react";
import { ArrowUpDown } from "lucide-react";
import { TableHead } from "@/components/ui/table";

type SortDirection = "asc" | "desc";

interface SortableTableHeadProps
  extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  sortKey: string;
  onSort: (key: string, direction: SortDirection) => void;
  currentSortKey: string | null;
  currentSortDirection: SortDirection;
}

const SortableTableHead = React.forwardRef<
  HTMLTableCellElement,
  SortableTableHeadProps
>(
  (
    {
      children,
      className,
      sortKey,
      onSort,
      currentSortKey,
      currentSortDirection,
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      // If already sorting by this key, toggle direction, otherwise set to asc
      const direction =
        currentSortKey === sortKey && currentSortDirection === "asc"
          ? "desc"
          : "asc";

      onSort(sortKey, direction);
    };

    return (
      <TableHead
        ref={ref}
        className={`cursor-pointer ${className || ""}`}
        onClick={handleClick}
        {...props}>
        {children}
        <ArrowUpDown
          className={`ml-2 h-4 w-4 inline transition-all ${
            currentSortKey === sortKey ? "opacity-100" : "opacity-50"
          } ${
            currentSortKey === sortKey && currentSortDirection === "desc"
              ? "rotate-180"
              : ""
          }`}
        />
      </TableHead>
    );
  }
);

SortableTableHead.displayName = "SortableTableHead";

export { SortableTableHead };
