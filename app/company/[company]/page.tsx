"use client";
import React, { useState } from "react";
import {
  Building2,
  TrendingUp,
  Users,
  Globe,
  MapPin,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Activity,
} from "lucide-react";

// Simulated data - in a real app this would come from an API
const companyData = {
  name: "Marathon Digital Holdings, Inc.",
  ticker: "MARA",
  price: 122.45,
  change: 3.5,
  marketCap: "21.5B",
  employees: "50-200",
  founded: 2010,
  website: "https://marathondh.com",
  headquarters: "Las Vegas, Nevada",
  description:
    "Marathon Digital Holdings (NASDAQ:MARA) is a digital asset technology company that mines cryptocurrencies with a focus on the blockchain ecosystem and the generation of digital assets.",
};

const news = [
  {
    date: "March 1, 2024",
    title: "Marathon Digital announces expansion of mining operations",
  },
  {
    date: "March 2, 2024",
    title: "Q4 Earnings exceed analyst expectations",
  },
  {
    date: "March 3, 2024",
    title: "New partnership announced with renewable energy provider",
  },
];

const timePeriods = ["1D", "1W", "1M", "1Y", "ALL"];

function App() {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-4 rounded-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {companyData.name}
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-gray-500">${companyData.ticker}</span>
                  <span className="text-sm px-2 py-1 bg-gray-100 rounded-full">
                    NASDAQ
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">
                ${companyData.price}
              </div>
              <div
                className={`flex items-center justify-end space-x-1 ${
                  companyData.change >= 0 ? "text-green-600" : "text-red-600"
                }`}>
                {companyData.change >= 0 ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                <span className="font-semibold">
                  {Math.abs(companyData.change)}%
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
                {companyData.description}
              </p>

              {/* Key Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Market Cap</div>
                    <div className="font-semibold">{companyData.marketCap}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-50 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Employees</div>
                    <div className="font-semibold">{companyData.employees}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-50 p-2 rounded-lg">
                    <Activity className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Founded</div>
                    <div className="font-semibold">{companyData.founded}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Chart Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Price History</h2>
                <div className="flex space-x-2">
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
                </div>
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <span className="text-gray-400">
                  Chart visualization would go here
                </span>
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
                      href={companyData.website}
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
                    <div>{companyData.headquarters}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest News Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Latest News</h2>
              <div className="space-y-4">
                {news.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      index !== news.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    } pb-4`}>
                    <div className="text-sm text-gray-400 mb-1">
                      {item.date}
                    </div>
                    <a
                      href="#"
                      className="font-medium hover:text-blue-600 transition-colors">
                      {item.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
