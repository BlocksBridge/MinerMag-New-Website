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
import TableEnterprise from "./tableEnterprise";

import { companies } from "../companiesData";
export default async function CompanyTable() {
  let MinerMagData: {
    realizedHashrate: any;
    priceHashratio: any;
    bitcoinHoldings: { "Holdings (BTC)": any };
    realizationRate: any;
  } = await fetch(`${process.env.NEXT_PUBLIC_website_url}/api/statistics`).then(
    (res) => res.json()
  );
  let getData = await Promise.all(
    companies.map(async (companySymbol) => {
      let call = await fetch(
        `${
          process.env.NEXT_PUBLIC_website_url
        }/api/enterprisedata?company=${companySymbol.toUpperCase()}`
      ).then((res) => res.json());

      let finalData = { ...call.data[0] };
      // This Formats and Normalises Realized Hash Rate Data and Includes it in Object
      let realizedHashMonth = MinerMagData.realizedHashrate[companySymbol]
        ? String(Object.keys(MinerMagData.realizedHashrate[companySymbol])[0])
        : null;

      let priceHashRatioMonth = MinerMagData.priceHashratio[companySymbol]
        ? String(Object.keys(MinerMagData.priceHashratio[companySymbol])[0])
        : null;

      let realizedRateMonth = MinerMagData.realizationRate[companySymbol]
        ? String(Object.keys(MinerMagData.realizationRate[companySymbol])[0])
        : null;

      if (realizedHashMonth !== null) {
        let realizedHashData =
          MinerMagData.realizedHashrate[companySymbol][
            String(realizedHashMonth)
          ];
        finalData["realizedHash"] = {
          month: String(realizedHashMonth),
          price: Number(realizedHashData),
        };
      }
      if (priceHashRatioMonth !== null) {
        let priceHashratioPrice =
          MinerMagData.realizedHashrate[companySymbol][
            String(priceHashRatioMonth)
          ];
        finalData["priceHashratio"] = {
          month: String(priceHashRatioMonth),
          price: Number(priceHashratioPrice),
        };
      }
      if (realizedRateMonth !== null) {
        let realizedRateData =
          MinerMagData.realizationRate[companySymbol][
            String(realizedRateMonth)
          ];
        finalData["realizationRate"] = {
          month: String(realizedRateMonth),
          price: realizedRateData,
        };
      }

      if (
        MinerMagData.bitcoinHoldings["Holdings (BTC)"][companySymbol] !=
        undefined
      ) {
        finalData["bitcoinHolding"] = Number(
          MinerMagData.bitcoinHoldings["Holdings (BTC)"][companySymbol]
        );
      }
      return finalData;
    })
  );

  if (getData.length) {
    return (
      <>
        <div>
          <TableEnterprise data={getData} />
        </div>
        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead className="text-center">
                Enterprise Value
              </TableHead>{" "}
              <TableHead className="text-center">
                Realized Hashrate ({getData[0].realizedHash.month})
              </TableHead>
              <TableHead className="text-center">
                Price-to-Hash Ratio ($/TH/s) ({getData[0].priceHashratio.month})
              </TableHead>
              <TableHead className="text-center">Holdings (BTC)</TableHead>
              <TableHead className="text-center">
                Realization Rate ({getData[0].realizationRate.month})
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getData.map((company, index) => {
              return (
                <TableRow key={company.symbol}>
                  <TableCell className="font-medium">
                    {" "}
                    <Link
                      target="_blank"
                      href={`/company/${company.symbol.toUpperCase()}`}>
                      {company.symbol}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    ${" "}
                    {company.enterpriseValue.toLocaleString("en-us", {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-center">
                    {company?.realizedHash?.price
                      ? company?.realizedHash?.price
                      : "TBD"}
                  </TableCell>{" "}
                  <TableCell className="text-center">
                    {company?.priceHashratio?.price
                      ? company?.priceHashratio?.price
                      : "TBD"}
                  </TableCell>
                  <TableCell className="text-center">
                    {company?.bitcoinHolding ? company?.bitcoinHolding : "TBD"}
                  </TableCell>
                  <TableCell className="text-center">
                    {company?.realizationRate?.price
                      ? company?.realizationRate?.price
                      : "TBD"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table> */}
      </>
    );
  }
}
