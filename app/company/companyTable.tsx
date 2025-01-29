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
import { useState, useEffect } from "react";

export default function CompanyTable({ data, companies }) {
  const [getData, setData] = useState([]);
  useEffect(() => {
    (async () => {
      let getIndividualMarketData = await Promise.all(
        companies.map(async (i) => {
          let call = await fetch(
            `https://financialmodelingprep.com/api/v3/quote-order/${i}?apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb`
          ).then((res) => res.json());

          return call[0];
        })
      );

      setData(getIndividualMarketData);
    })();
  }, []);
  if (getData.length) {
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
}
