"use server";
import Link from "next/link";
import Image from "next/image";
import { companies } from "@/app/companiesData";
import Search from "./Search";
import { ChevronDown, Building2, ChevronUp, Menu, X } from "lucide-react";
import "@/app/company/[company]/tradingView.css";
import TickerTape from "./StockTicker";
import MobileHeader from "./MobileHeader";
export default async function Header() {
  let companyWithPrices = await Promise.all(
    companies.map(async (i) => {
      let getStockPrice = await fetch(
        `${
          process.env.NEXT_PUBLIC_website_url
        }/api/companyprofile?company=${i.toUpperCase()}`
      ).then((res) => res.json());
      return {
        company: i.toUpperCase(),
        stockPrice: getStockPrice.data[0].price,
        marketCap: getStockPrice.data[0].marketCap,
        priceChange: getStockPrice.data[0].change,
      };
    })
  ).then((i) => {
    return i;
  });
  let currentdate = new Date();
  let datetime =
    "Last Sync: " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return (
    <>
      {" "}
      <div className="bg-blue-600 text-white py-2 text-center text-sm">
        <Link
          href="https://apidashboard.theminermag.com/"
          className="hover:underline">
          Announcing TheMinerMag's API →
        </Link>
      </div>
      {/* Header */}
      <TickerTape
        symbols={companies.map((i) => ({ proName: i.toUpperCase() }))}
      />
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className=" text-white p-2 rounded">
                <Image
                  src={"/images/logo.png"}
                  width={150}
                  height={150}
                  alt="logo"
                />
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                className="text-sm font-medium hover:text-blue-600"
                href="/news">
                NEWS
              </Link>
              <Link
                className="text-sm font-medium hover:text-blue-600"
                href="https://pro.theminermag.com/">
                DATA
              </Link>
              <div className="text-sm font-medium hover:text-blue-600 group">
                <Link
                  className="flex justify-center items-center"
                  href="/company">
                  {" "}
                  COMPANIES
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="hidden group-hover:block hover:block absolute bg-white shadow-lg rounded-lg  w-5/6 left-0 right-0 top-15 h-[70vh] lg:h-auto m-auto p-2 z-50  overflow-scroll">
                  <ul className="grid grid-cols-5 gap-2 justify-center items-center overflow-scroll  ">
                    {companyWithPrices.map((company, index) => {
                      return (
                        <Link
                          key={index}
                          target="_blank"
                          href={`/company/${company.company}`}
                          className="rounded-lg border   p-4 hover:bg-gray-200">
                          <div className="flex flex-col w-full">
                            <span className="font-bold text-gray-900 flex">
                              {company.company}
                              {"  "}
                              <div
                                className={`flex ${
                                  company.priceChange >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}>
                                {company.priceChange >= 0 ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                                <span className="font-semibold">
                                  {Math.abs(company.priceChange)}%
                                </span>
                              </div>
                            </span>
                            <span className="text-gray-600">
                              Stock Price:{" "}
                              {company.stockPrice.toLocaleString("en-us", {
                                minimumFractionDigits: 2,
                              })}
                              $
                            </span>
                            <span className="text-gray-600">
                              Market Cap:{" "}
                              {company.marketCap.toLocaleString("en-us", {
                                minimumFractionDigits: 0,
                              })}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </ul>
                  <p className="p-2 text-black">{datetime}</p>
                </div>
              </div>
              <Link
                className="text-sm font-medium hover:text-blue-600"
                href="/learn">
                LEARN
              </Link>
              <Search />
            </nav>
            {/* Mobile Menu */}
            <MobileHeader />
          </div>
        </div>
      </header>
    </>
  );
}
