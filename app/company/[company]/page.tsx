import React from "react";
import {
  Building2,
  TrendingUp,
  Users,
  MapPin,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Activity,
} from "lucide-react";
import TradingView from "./tradingView";
import Link from "next/link";
import {
  Newspaper,
  Twitter,
  Linkedin,
  Globe,
  ArrowUpRight,
} from "lucide-react";

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
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/tags`
  ).then((res) => res.json());
  let companyTag = null;
  console.log(getAllTags);
  let findCorrectTag = getAllTags.forEach((i) => {
    if (i.slug == param.company) {
      companyTag = i.id;
    }
  });
  let getCompanyArticles = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/posts?tags=${companyTag}&acf_format=standard`
  ).then((res) => res.json());
  console.log(getCompanyArticles, "articles");
  let getCompanyInfo = await fetch(
    `https://sandbox.financialmodelingprep.com/stable/profile?symbol=${param.company}&apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb`
  ).then((res) => res.json());

  let getCompanyNews = await fetch(
    `https://sandbox.financialmodelingprep.com/stable/news/stock?symbols=${param.company.toUpperCase()}&apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb`
  ).then((res) => res.json());
  // console.log(getCompanyNews, "news");
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-4 rounded-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {getCompanyInfo[0].companyName}
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-gray-500">
                    {getCompanyInfo[0].symbol}
                  </span>
                  <span className="text-sm px-2 py-1 bg-gray-100 rounded-full">
                    NASDAQ
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">
                ${getCompanyInfo[0].price}
              </div>
              <div
                className={`flex items-center justify-end space-x-1 ${
                  getCompanyInfo[0].change >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}>
                {getCompanyInfo[0].change >= 0 ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                <span className="font-semibold">
                  {Math.abs(getCompanyInfo[0].change)}%
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
                {getCompanyInfo[0].description}
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
                      {getCompanyInfo[0].marketCap.toLocaleString("en-us", {
                        minimumFractionDigits: 0,
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-50 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Employees</div>
                    <div className="font-semibold">
                      {getCompanyInfo[0].fullTimeEmployees}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-50 p-2 rounded-lg">
                    <Activity className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">IPO</div>
                    <div className="font-semibold">
                      {new Date(getCompanyInfo[0].ipoDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
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
                      href={getCompanyInfo[0].website}
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
                      {getCompanyInfo[0].address +
                        ", " +
                        getCompanyInfo[0].city +
                        " "}
                      {getCompanyInfo[0]?.state
                        ? getCompanyInfo[0]?.state
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
                {getCompanyArticles.slice(0, 4).map((item, index) => (
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
                      dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                      className="font-medium hover:text-blue-600 transition-colors"></a>
                  </div>
                ))}
              </div>
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
            <a
              href="#"
              className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
              View all press releases
              <ArrowUpRight className="ml-1 w-4 h-4" />
            </a>
          </section>

          {/* Social Media Section */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Social Media</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {socialFeeds.map((post, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <post.icon className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">
                      {post.platform}
                    </span>
                    <span className="text-sm text-gray-500">• {post.date}</span>
                  </div>
                  <p className="text-gray-600 mb-3">{post.content}</p>
                  <div className="text-sm text-gray-500">
                    {post.engagement} engagements
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-4">
              <a
                href="https://twitter.com/RiotBlockchain"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors">
                <Twitter className="w-5 h-5" />
                Follow on Twitter
              </a>
              <a
                href="https://www.linkedin.com/company/riot-blockchain"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#084d93] transition-colors">
                <Linkedin className="w-5 h-5" />
                Follow on LinkedIn
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export async function generateMetadata({ params, searchParams }) {
  const param = await params;
  return { title: param.company.split("-").join(" ") + " By TheMinerMag" };
}

export async function generateStaticParams() {
  const companies = [
    "MARA",
    "RIOT",
    "CORZ",
    "BTDR",
    "CLSK",
    "IREN",
    "HUT",
    "WULF",
    "PHX",
    "CIFR",
    "FUFU",
    "BITF",
    "BTBT",
    "CAN",
    "CANG",
    "HIVE",
    "SDIG", // To be removed once merger with Bitfarms is complete
    "ARBK",
    "BTCM",
    "GRYP",
    "SOS",
    "SLNH",
    "GREE",
    "LMFA",
    "MIGI",
    "BTOG",
    "DGHI",
    "DMGI",
    "ANY",
    "NB2",
  ];

  return companies.map((company) => ({ company }));
}
