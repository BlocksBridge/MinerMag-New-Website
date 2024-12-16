import Image from "next/image";
import Link from "next/link";

export default async function HomePage({ getPosts }: { getPosts: [any] }) {
  const three = getPosts.slice(1, 4).map((item) => {
    return {
      //   image: "/placeholder.svg?height=200&width=400",
      image: item.acf.main_image,
      date: item.date,
      title: item.title.rendered,
      excerpt: item.acf.sub_title,
    };
  });
  console.log(three);
  return (
    <div
      className={`min-h-screen bg-gray-100 flex flex-col font-[family-name:var(--font-geist-sans)`}>
      {/* Top Banner */}

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-2">Quick Links</h2>
            <nav className="space-y-1">
              <Link
                href="#"
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
                <span>Bitcoin Price</span>
              </Link>
              <Link
                href="#"
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
                <span>Mining Hardware</span>
              </Link>
              <Link
                href="#"
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
                <span>Network Hashrate</span>
              </Link>
              <Link
                href="#"
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
                <span>Mining Profitability</span>
              </Link>
              <Link
                href="#"
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
                    d="M7 12l3-3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 01-1-1V4z"
                  />
                </svg>
                <span>Market Analysis</span>
              </Link>
            </nav>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-2">Latest Tweets</h2>
            <div className="space-y-4">
              <div className="text-sm">
                <p className="mb-1">
                  @MiningInsider: New record high for #Bitcoin hashrate! Network
                  security stronger than ever.
                </p>
                <span className="text-gray-500">2 hours ago</span>
              </div>
              <div className="text-sm">
                <p className="mb-1">
                  @BlockchainDaily: Major mining pool announces expansion plans.
                  More decentralization on the horizon!
                </p>
                <span className="text-gray-500">5 hours ago</span>
              </div>
            </div>
          </div>
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
                <div className="text-sm text-gray-500 mb-2">
                  November 14, 2024
                </div>
                <h1 className="text-2xl font-bold mb-4">
                  {getPosts[0].title.rendered}
                </h1>
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
              <Link className="text-sm text-blue-600 hover:underline" href="#">
                View All
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {three.map((article, index) => (
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
                      {article.date}
                    </div>
                    <h3 className="font-semibold mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600">{article.excerpt}</p>
                  </div>
                </div>
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
                  value: "$89,277.00",
                  change: "-1.77% (24h)",
                  changeColor: "text-red-500",
                },
                {
                  title: "Network Hashrate",
                  value: "512 EH/s",
                  change: "+2.3% (24h)",
                  changeColor: "text-green-500",
                },
                {
                  title: "Mining Difficulty",
                  value: "71.5 T",
                  change: "+0.8% (last adjustment)",
                  changeColor: "text-green-500",
                },
                {
                  title: "Block Reward",
                  value: "6.25 BTC",
                  change: "Next halving in 298 days",
                  changeColor: "text-gray-500",
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <div className="text-3xl font-bold">{item.value}</div>
                  <div className={`text-sm ${item.changeColor}`}>
                    {item.change}
                  </div>
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
                  title: "Mining Hardware Guide",
                  description:
                    "Explore different types of mining hardware and learn how to choose the right equipment for your needs.",
                  cta: "Read Guide",
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  {item.icon}
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {item.description}
                  </p>
                  <button className="px-4 py-2 text-sm border border-zinc-200 border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors dark:border-zinc-800">
                    {item.cta}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <p className="text-sm text-gray-600">
                TheMinerMag is your go-to source for the latest news, analysis,
                and insights in the world of cryptocurrency mining.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <nav className="space-y-2">
                <Link href="#" className="block text-sm hover:text-blue-600">
                  Home
                </Link>
                <Link href="#" className="block text-sm hover:text-blue-600">
                  News
                </Link>
                <Link href="#" className="block text-sm hover:text-blue-600">
                  Market Data
                </Link>
                <Link href="#" className="block text-sm hover:text-blue-600">
                  Learn
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-600">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 3.221 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <form className="space-y-2">
                <input
                  className="w-full px-3 py-2 border border-zinc-200 rounded text-sm dark:border-zinc-800"
                  placeholder="Enter your email"
                  type="email"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            © 2024 TheMinerMag. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
