"use server";
import Link from "next/link";
import Image from "next/image";
import { companies } from "@/app/companiesData";
import Search from "./Search";
import numeral from "numeral";
import "./Header.css";
import {
  ChevronDown,
  Building2,
  ChevronUp,
  Menu,
  X,
  CircleUser,
} from "lucide-react";
import "@/app/company/[company]/tradingView.css";
import TickerTape from "./StockTicker";
import MobileHeader from "./MobileHeader";
import { GetStockProfile } from "@/lib/stockData";

// Separate data fetching function with error handling
// async function fetchCompanyStocks() {
//   try {
//     // Add a conditional check for process.env during build
//     const apiUrl = process.env.NEXT_PUBLIC_website_url || "";
//     if (!apiUrl) {
//       console.warn("NEXT_PUBLIC_website_url not available during build");
//       return [];
//     }

//     // const res = await fetch(`/api/stockprofile`, {
//     //   // Add timeout to prevent hanging during build
//     //   signal: AbortSignal.timeout(5000),
//     //   // Prevent request caching issues
//     //   next: { revalidate: 60 },
//     // });

//     if (!res.ok) {
//       console.error(`Failed to fetch stocks: ${res.status}`);
//       return [];
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("Error fetching company stocks:", error);
//     return [];
//   }
// }

export default async function Header() {
  let allCompanyStocks = [];

  try {
    // Only fetch in production environment, not during build

    // const getCompanyStocks = await fetchCompanyStocks();
    const getCompanyStocks = await GetStockProfile();

    if (
      getCompanyStocks &&
      Array.isArray(getCompanyStocks) &&
      getCompanyStocks.length > 0
    ) {
      allCompanyStocks = getCompanyStocks
        .map((i) => {
          try {
            const companyData = i.data_points || {};
            return {
              company: companyData.symbol
                ? companyData.symbol.toUpperCase()
                : "UNKNOWN",
              stockPrice: companyData.price || 0,
              marketCap: companyData.marketCap || 0,
              priceChange: Number(companyData.changePercentage).toFixed(2) || 0,
            };
          } catch (err) {
            console.error("Error processing company data:", err);
            return null;
          }
        })
        .filter(Boolean); // Remove any null entries
    }
  } catch (error) {
    console.error("Error in Header component:", error);
    // Continue with empty data instead of failing
  }

  // Fallback data if API fails
  if (!allCompanyStocks || allCompanyStocks.length === 0) {
    allCompanyStocks = companies.map((symbol) => ({
      company: symbol.toUpperCase(),
      stockPrice: 0,
      marketCap: 0,
      priceChange: 0,
    }));
  }

  let currentdate = new Date();
  let datetime =
    "Last Sync: " +
    currentdate.toDateString() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  return (
    <>
      <div className="bg-blue-600 text-white py-2 text-center text-sm">
        <Link
          href="https://apidashboard.theminermag.com/"
          className="hover:underline">
          Announcing TheMinerMag's API →
        </Link>
      </div>
      <div className="disabled pointer-events-none ">
        <TickerTape
          displayMode="adaptive"
          symbols={companies.map((i) => ({ proName: i.toUpperCase() }))}
        />
      </div>
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
                  COMPANIES
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="Search hidden group-hover:block hover:block absolute bg-white shadow-lg rounded-lg overscroll-contain w-5/6 left-0 right-0 top-15 h-[70vh] lg:h-auto m-auto p-2 z-50  overflow-auto">
                  <ul className="grid grid-cols-5 gap-2 justify-center items-center overflow-scroll">
                    {allCompanyStocks.map((company, index) => (
                      <Link
                        key={index}
                        target="_blank"
                        href={`/company/${company.company}`}
                        className="rounded-lg border p-4 hover:bg-gray-200">
                        <div className="flex flex-col w-full">
                          <span className="font-bold text-gray-900 flex">
                            {company.company}
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
                            Stock Price: $
                            {company.stockPrice.toLocaleString("en-us", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                          <span className="text-gray-600">
                            Market Cap:{" "}
                            {numeral(
                              company.marketCap.toLocaleString("en-us", {
                                minimumFractionDigits: 0,
                              })
                            )
                              .format("($ 0.00 a)")
                              .replace(" ", "")
                              .toUpperCase()}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </ul>
                  <p className="p-2 text-black">{datetime}</p>
                </div>
              </div>

              <Link
                className="text-sm font-medium hover:text-blue-600"
                href="/research">
                RESEARCH
              </Link>
              <Link
                className="text-sm font-medium hover:text-blue-600"
                href="/newsletter/login">
                <CircleUser className="w-5 h-5" /> {/* Use Mail icon here */}
              </Link>
              <Search />
            </nav>
            <MobileHeader />
          </div>
        </div>
      </header>
    </>
  );
}
