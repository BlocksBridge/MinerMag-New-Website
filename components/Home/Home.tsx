import Image from "next/image";
import Link from "next/link";
import { geistSans } from "@/app/fonts/fonts";
import Twitter from "./Twitter";

export default async function HomePage({
  getPosts,
  BitcoinData,
  NetworkOverview,
  BlockReward,
  NetworkDiff,
}: {
  getPosts: [any];
  BitcoinData: [any];
  NetworkOverview: [any];
  BlockReward: [any];
  NetworkDiff: [any];
}) {
  const three = getPosts.slice(1, 4).map((item) => {
    return {
      //   image: "/placeholder.svg?height=200&width=400",
      image: item.acf.main_image,
      date: item.date,
      title: item.title.rendered,
      excerpt: item.acf.sub_title,
      link: item.link,
    };
  });

  return (
    <div className={`min-h-screen bg-gray-100 flex flex-col font-sans `}>
      {/* Top Banner */}

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-2">Quick Links</h2>
            <nav className="space-y-1">
              <Link
                target="_blank"
                href="/company"
                className="flex items-center space-x-2 text-sm hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 .895 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 11-18 0118 0z"
                  />
                </svg>
                <span>Market Data</span>
              </Link>
              <Link
                target="_blank"
                href="/learn"
                className="flex items-center space-x-2 text-sm hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 00-2-2H7a2 00-2 2v10a2 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
                <span>Learn</span>
              </Link>
              <Link
                target="_blank"
                href="https://pro.theminermag.com"
                className="flex items-center space-x-2 text-sm hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>Statistics</span>
              </Link>
              <Link
                target="_blank"
                href="/news"
                className="flex items-center space-x-2 text-sm hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 .895 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 11-18 0118 0z"
                  />
                </svg>
                <span>News</span>
              </Link>
            </nav>
          </div>
          {/* <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-2">Latest Tweets</h2>
            <div className="space-y-4">
              <Twitter />
            </div>
          </div> */}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-8">
          {/* Featured Article */}
          <div className="bg-white overflow-hidden rounded-lg shadow">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-[300px] md:h-auto">
                <Image
                  alt="Mining Facility"
                  className="object-cover"
                  fill
                  src={getPosts[0].acf.main_image}
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2 ">
                  {new Date(getPosts[0].date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <h1
                  className="text-2xl font-bold mb-4"
                  dangerouslySetInnerHTML={{
                    __html: getPosts[0].title.rendered,
                  }}></h1>
                <p className="text-gray-600 mb-4">
                  {getPosts[0].acf.sub_title}
                </p>
                <Link href={getPosts[0].link.split(".com")[1]}>
                  <button className="px-4 py-2 border border-zinc-200 border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors dark:border-zinc-800">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Latest News Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Latest News</h2>
              <Link
                className="text-sm text-blue-600 hover:underline"
                href="/news">
                View All
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {three.map((article, index) => (
                <Link
                  href={article.link.split(".com")[1].replace("/home", "")}
                  key={index}>
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        alt={article.title}
                        className="object-cover"
                        fill
                        src={article.image}
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-gray-500 mb-2">
                        {new Date(article.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <h3
                        className="font-semibold mb-2"
                        dangerouslySetInnerHTML={{
                          __html: article.title,
                        }}></h3>
                      <p className="text-sm text-gray-600">{article.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Market Data Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Market Data</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Bitcoin Price",
                  value: `${BitcoinData[
                    BitcoinData.length - 1
                  ].closePrice.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                  })}$`,
                  change: `${
                    (
                      ((BitcoinData[BitcoinData.length - 1].closePrice -
                        BitcoinData[BitcoinData.length - 1].openPrice) /
                        BitcoinData[BitcoinData.length - 1].openPrice) *
                      100
                    ).toFixed(2) + "%"
                  } (24h)`,
                  lastUpdated: ` ${`Last Updated: ${new Date(
                    BitcoinData[BitcoinData.length - 1].closeTime
                  ).toDateString()}`}`,
                  changeColor: `${
                    Number(
                      ((BitcoinData[BitcoinData.length - 1].closePrice -
                        BitcoinData[BitcoinData.length - 1].openPrice) /
                        BitcoinData[BitcoinData.length - 1].openPrice) *
                        100
                    ) > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`,
                },
                {
                  title: "Network Hashrate",
                  value: `${NetworkOverview.networkHashrate7d.toLocaleString(
                    "en-us",
                    {
                      minimumFractionDigits: 0,
                    }
                  )} TH/s`,
                  change: `Fees in Blocks (24h): ${NetworkOverview.feesBlocks24h} BTC`,
                  additional: `Est. Difficulty Adjustment: ${NetworkOverview.estDiffAdj}%`,
                  changeColor: "text-gray-500",
                },
                {
                  title: "Network Difficulty",
                  value: `${NetworkDiff[0]["difficulty"].toLocaleString(
                    "en-us",
                    {}
                  )}`,

                  lastUpdated: ` ${`Last Updated: ${new Date(
                    NetworkDiff[0].timestamp
                  ).toDateString()}`}`,
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className={`text-sm ${item.changeColor}`}>
                    {item.change}
                  </div>
                  {item.additional ? (
                    <div className={`text-sm ${item.changeColor}`}>
                      {item.additional}
                    </div>
                  ) : null}
                  {item.lastUpdated ? (
                    <div className={`text-sm text-gray-700`}>
                      {item.lastUpdated}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          {/* Educational Content */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Learn About Mining</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600"
                      fill="none"
                      viewBox="0 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 3 6.253v13C4.168 18.477 5.754 18 18s3.332.477 4.5 1.253m0-13C13.168 14.754 16.5 5c1.747 0 3.332.477 1.253v13C19.832 18.247 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  ),
                  title: "Bitcoin Mining 101",
                  description:
                    "Learn the basics of Bitcoin mining, from blockchain technology to proof-of-work consensus.",
                  cta: "Start Learning",
                  link: "/learn",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600"
                      fill="none"
                      viewBox="0 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 00-2-2H7a2 00-2 2v10a2 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  ),
                  title: "Bitcoin Mining Research",
                  description:
                    "Explore different types of mining hardware and learn how to choose the right equipment for your needs.",
                  cta: "Read Research",
                  link: "/research",
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  {item.icon}
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {item.description}
                  </p>
                  <Link
                    href={item.link}
                    className="px-4 py-2 text-sm border border-zinc-200 border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors dark:border-zinc-800">
                    {item.cta}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
