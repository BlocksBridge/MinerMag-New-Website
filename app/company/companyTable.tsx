"use client";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { redirect } from "next/navigation";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function CompanyTable({ data }) {
  return (
    <Table>
      <TableCaption>Bitcoin Mining Companies Stat</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Market Cap</TableHead>
          <TableHead className="text-center">1D H</TableHead>
          <TableHead className="text-center">1D L</TableHead>
          <TableHead className="text-center">Volume</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((company) => {
          if (company) {
            return (
              <TableRow
                key={company.name}
                onClick={() => {
                  console.log("clicked");
                  redirect(`/company/${company.symbol}`);
                }}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>
                  {company.price.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                  })}
                  $
                </TableCell>
                <TableCell>
                  {company.marketCap.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                  })}
                  $
                </TableCell>
                <TableCell className="text-center">
                  {company.dayHigh.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                  })}
                  %
                </TableCell>
                <TableCell className="text-center">
                  {company.dayLow.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                  })}
                  %
                </TableCell>
                <TableCell className="text-center">
                  {company.volume.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            );
          }
        })}
        {/* {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))} */}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
