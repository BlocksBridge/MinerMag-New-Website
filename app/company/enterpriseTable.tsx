"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
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

export default function CompanyTable({ data, companies }) {
  const [getData, setData] = useState([]);

  useEffect(() => {
    (async () => {
      let getIndividualEnterpriseData = await Promise.all(
        companies.map(async (i) => {
          let call = await fetch(
            `      https://financialmodelingprep.com/api/v3/enterprise-values/${i}/?period=quarter&apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb
`
          ).then((res) => res.json());
          let getRealizedData = await fetch("/api/statistics").then((res) =>
            res.json()
          );

          let realizedHashMonth = getRealizedData.realizedHashrate[i]
            ? String(Object.keys(getRealizedData.realizedHashrate[i])[0])
            : null;
          if (realizedHashMonth == null) {
            return call[0];
          } else {
            let realizedHashData =
              getRealizedData.realizedHashrate[i][String(realizedHashMonth)];

            return {
              ...call[0],
              realizedHash: {
                month: String(realizedHashMonth),
                price: realizedHashData,
              },
            };
          }
        })
      );
      setData(getIndividualEnterpriseData);
    })();
  }, []);
  if (getData.length) {
    console.log(getData, "dta", getData.length);
    return (
      <Table>
        <TableCaption>Bitcoin Mining Companies Stat</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead className="text-center">Enterprise Value</TableHead>{" "}
            <TableHead className="text-center">
              Realized Hashrate ({getData[0].realizedHash.month})
            </TableHead>
            <TableHead className="text-center">No. of Shares</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getData.map((company, index) => {
            return (
              <TableRow
                key={company.symbol}
                onClick={() => {
                  console.log("clicked");
                  redirect(`/company/${company.symbol}`);
                }}>
                <TableCell className="font-medium">{company.symbol}</TableCell>

                <TableCell>
                  {company.marketCapitalization.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                  })}
                  $
                </TableCell>
                <TableCell className="text-center">
                  {company.enterpriseValue.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                  })}
                  $
                </TableCell>
                <TableCell className="text-center">
                  {company?.realizedHash?.price
                    ? company?.realizedHash?.price
                    : 0}
                </TableCell>
                <TableCell className="text-center">
                  {company.numberOfShares.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            );
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
