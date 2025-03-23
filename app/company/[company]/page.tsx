import React from "react";
import {
  Building2,
  TrendingUp,
  AlignCenterHorizontal,
  MapPin,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Activity,
} from "lucide-react";
import TradingView from "./tradingView";
import { companies } from "@/app/companiesData";
import numeral from "numeral";

import Link from "next/link";
import {
  Newspaper,
  Twitter,
  Linkedin,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import SECFilingsSection from "./secFill";

export default async function CompanyPage({
  params,
}: {
  params: { company: string };
}) {
  const param = await params;
  const pressReleases = [
    {
      date: "2024-03-15",
      title: "RIOT Blockchain Reports Record Q4 2023 Results",
      url: "#",
    },
    {
      date: "2024-02-28",
      title: "RIOT Expands Texas Mining Operations with New Facility",
      url: "#",
    },
    {
      date: "2024-02-10",
      title:
        "RIOT Announces Strategic Partnership with Renewable Energy Provider",
      url: "#",
    },
  ];

  const socialFeeds = [
    {
      platform: "Twitter",
      content:
        "Excited to announce our latest expansion in sustainable #Bitcoin mining operations! 🌱⚡️",
      date: "2h ago",
      engagement: "1.2K",
      icon: Twitter,
    },
    {
      platform: "LinkedIn",
      content:
        "RIOT continues to lead the industry in sustainable cryptocurrency mining practices. Read our latest sustainability report.",
      date: "1d ago",
      engagement: "856",
      icon: Linkedin,
    },
  ];

  // const [selectedPeriod, setSelectedPeriod] = useState("1M");
  let getAllTags = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/tags?per_page=100`
  ).then((res) => res.json());

  let companyTag: Number | null = null;
  let findCorrectTag = getAllTags.forEach((i) => {
    if (i.slug.toUpperCase() == param.company.toUpperCase()) {
      companyTag = i.id;
    }
  });
  let getCompanyArticles = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/posts?tags=${companyTag}&acf_format=standard`
  ).then((res) => res.json());
  let getCompanyInfo = await fetch(
    `${
      process.env.NEXT_PUBLIC_website_url
    }/api/companyprofile?company=${param.company.toUpperCase()}`
  ).then((res) => res.json());
  // console.log(getCompanyInfo);
  let getCompanyNews = await fetch(
    `https://sandbox.financialmodelingprep.com/stable/news/stock?symbols=${param.company.toUpperCase()}&apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb`
  ).then((res) => res.json());

  let MinerMagData: {
    realizedHashrate: any;
    priceHashratio: any;
    bitcoinHoldings: { "Holdings (BTC)": any };
    realizationRate: any;
  } = await fetch(`${process.env.NEXT_PUBLIC_website_url}/api/statistics`).then(
    (res) => res.json()
  );

  let realizedHashRate = null;
  let realizedHashMonth = null;
  try {
    if (
      MinerMagData.realizedHashrate[getCompanyInfo.data[0].symbol][
        String(
          Object.keys(
            MinerMagData.realizedHashrate[getCompanyInfo.data[0].symbol]
          )[0]
        )
      ] &&
      String(
        Object.keys(
          MinerMagData.realizedHashrate[getCompanyInfo.data[0].symbol]
        )[0]
      )
    ) {
      realizedHashMonth = String(
        Object.keys(
          MinerMagData.realizedHashrate[getCompanyInfo.data[0].symbol]
        )[0]
      );
      realizedHashRate =
        MinerMagData.realizedHashrate[getCompanyInfo.data[0].symbol][
          String(
            Object.keys(
              MinerMagData.realizedHashrate[getCompanyInfo.data[0].symbol]
            )[0]
          )
        ];
    }
  } catch (e) {
    console.log("ee");
  }

  // console.log(MinerMagData, "data comapny");
  // console.log(getCompanyNews, "news");
  if (getCompanyInfo.data.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Header */}{" "}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center"></div>
              <Link
                href="/company"
                className="text-sm text-blue-600 hover:underline">
                ← Back to Companies
              </Link>
            </div>
            <div className="grid grid-cols-2 md:flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 p-4 rounded-lg">
                  <Building2 className="h-4 w-4 md:h-8 md:w-8 text-white" />
                </div>
                <div>
                  <h1 className="md:text-2xl font-bold text-gray-900">
                    {getCompanyInfo.data[0]?.companyName}
                  </h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-gray-500">
                      {getCompanyInfo.data[0]?.symbol}
                    </span>
                    <span className="text-sm px-2 py-1 bg-gray-100 rounded-full">
                      NASDAQ
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                  ${getCompanyInfo.data[0].price}
                </div>
                <div
                  className={`flex items-center justify-end space-x-1 ${
                    getCompanyInfo.data[0].change >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                  {getCompanyInfo.data[0].change >= 0 ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  <span className="font-semibold">
                    {Math.abs(getCompanyInfo.data[0].changePercentage)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Company Overview</h2>
                <p className="text-gray-600 leading-relaxed">
                  {getCompanyInfo.data[0].description}
                </p>

                {/* Key Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Market Cap</div>
                      <div className="font-semibold">
                        {numeral(
                          getCompanyInfo.data[0].marketCap.toLocaleString(
                            "en-us",
                            {
                              minimumFractionDigits: 0,
                            }
                          )
                        )
                          .format("($ 0.00 a)")
                          .replace(" ", "")
                          .toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-50 p-2 rounded-lg">
                      <AlignCenterHorizontal className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        Realized Hashrate
                        {realizedHashMonth ? `(${realizedHashMonth})` : null}
                      </div>
                      <div className="font-semibold">
                        {realizedHashRate ? realizedHashRate : "NA"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-50 p-2 rounded-lg">
                      <Activity className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        Bitcoin Holdings
                      </div>
                      <div className="font-semibold">
                        {MinerMagData.bitcoinHoldings["Holdings (BTC)"][
                          getCompanyInfo.data[0].symbol
                        ]
                          ? MinerMagData.bitcoinHoldings["Holdings (BTC)"][
                              getCompanyInfo.data[0].symbol
                            ]
                          : "NA"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Chart Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Price History</h2>
                  {/* <div className="flex space-x-2">
                  {timePeriods.map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        selectedPeriod === period
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}>
                      {period}
                    </button>
                  ))}
                </div> */}
                </div>
                <div className="h-96 w-full flex items-center justify-center bg-gray-50 rounded-lg">
                  <TradingView />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Company Info Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Company Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Globe className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Website</div>
                      <a
                        href={getCompanyInfo.data[0].website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 flex items-center space-x-1 group">
                        <span>Visit website</span>
                        <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Headquarters</div>
                      <div>
                        {getCompanyInfo.data[0].address +
                          ", " +
                          getCompanyInfo.data[0].city +
                          " "}
                        {getCompanyInfo.data[0]?.state
                          ? getCompanyInfo.data[0]?.state
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest News Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Latest News</h2>
                <div className="space-y-4">
                  {getCompanyArticles.length &&
                    getCompanyArticles.slice(0, 4).map((item, index) => (
                      <div
                        key={index}
                        className={`${
                          index !== getCompanyArticles.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        } pb-4`}>
                        <div className="text-sm text-gray-400 mb-1">
                          {new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <a
                          target="_blank"
                          href={`${item.link.split(".com")[1]}`}
                          dangerouslySetInnerHTML={{
                            __html: item.title.rendered,
                          }}
                          className="font-medium hover:text-blue-600 transition-colors"></a>
                      </div>
                    ))}
                </div>{" "}
                <Link
                  target="_blank"
                  href={`${
                    process.env.NEXT_PUBLIC_website_url
                  }/company/${param.company.toUpperCase()}/news`}
                  className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                  View all news
                  <ArrowUpRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            {/* Press Releases Section */}
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Newspaper className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Press Releases
                </h2>
              </div>
              <div className="grid gap-4">
                {getCompanyNews.slice(0, 4).map((press, index) => (
                  <Link
                    key={index}
                    href={press.url}
                    target="_blank"
                    className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500">
                          {new Date(press.publishedDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {press.title}
                        </h3>
                        <p className="mt-1 text-sm font-thin text-gray-900 group-hover:text-blue-600 transition-colors">
                          {press.text.slice(0, 150) + "..."}
                        </p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                target="_blank"
                href={`${
                  process.env.NEXT_PUBLIC_website_url
                }/company/${param.company.toUpperCase()}/news`}
                className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                View all press releases
                <ArrowUpRight className="ml-1 w-4 h-4" />
              </Link>
            </section>

            {/* Social Media Section */}
            {/* <SECFilingsSection company={param.company} /> */}
          </div>
        </main>
      </div>
    );
  } else {
    return <div>Something went wrong</div>;
  }
}

export async function generateMetadata({ params, searchParams }) {
  const param = await params;
  return { title: param.company.split("-").join(" ") + " By TheMinerMag" };
}

export async function generateStaticParams() {
  const allCompany = [...companies];
  allCompany.forEach((i) => allCompany.push(i.toLowerCase()));
  return allCompany.map((company) => ({ company }));
}

export const dynamicParams = false;
export const dynamic = "force-dynamic";
