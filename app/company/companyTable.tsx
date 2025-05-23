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
import TableCompany from "./tableCompany";
export default async function CompanyTable() {
  let getData = await Promise.all(
    companies.map(async (companySymbol) => {
      let call = await fetch(
        `${
          process.env.NEXT_PUBLIC_website_url
        }/api/marketdata?company=${companySymbol.toUpperCase()}`
      ).then((res) => res.json());
      let shortInt = await fetch(
        `${
          process.env.NEXT_PUBLIC_website_url
        }/api/shortinterest?company=${companySymbol.toUpperCase()}`
      ).then((res) => res.json());

      if (shortInt.data) {
        return {
          ...call.data[0],
          daysToCover: JSON.parse(shortInt.data.data_points).rows[0]
            .daysToCover,
        };
      } else {
        return { ...call.data[0] };
      }
    })
  );

  if (getData.length) {
    // console.log(getData, "data");
    return (
      <>
        <TableCompany data={getData} />

        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
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
                      $
                      {company.price.toLocaleString("en-us", {
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell>
                      $
                      {company.marketCap.toLocaleString("en-us", {
                        minimumFractionDigits: 2,
                      })}
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
          </TableBody>
        </Table> */}
      </>
    );
  }
}

export const dynamicParams = false;
