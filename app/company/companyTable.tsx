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
import { companies } from "../companiesData";

export default async function CompanyTable() {
  let getData = await Promise.all(
    companies.map(async (companySymbol) => {
      let call = await fetch(
        `${
          process.env.NEXT_PUBLIC_website_url
        }/api/marketdata?company=${companySymbol.toUpperCase()}`
      ).then((res) => res.json());
      return call.data[0];
    })
  );

  if (getData.length) {
    return (
      <Table>
        <TableCaption>Bitcoin Mining Companies Stat</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead className="text-center">1D H</TableHead>
            <TableHead className="text-center">1D L</TableHead>
            <TableHead className="text-center">Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getData.map((company) => {
            if (company) {
              return (
                <TableRow key={company.name}>
                  <TableCell className="font-medium">
                    <Link
                      target="_blank"
                      href={`/company/${company.symbol.toUpperCase()}`}>
                      {company.name}
                    </Link>
                  </TableCell>
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

export const dynamicParams = false;
