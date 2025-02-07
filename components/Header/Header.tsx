import Link from "next/link";
import Image from "next/image";
import { companies } from "@/app/companiesData";
import Search from "./Search";
import { ChevronDown, Building2 } from "lucide-react";
export default function Header() {
  return (
    <>
      {" "}
      <div className="bg-blue-600 text-white py-2 text-center text-sm">
        <Link href="#" className="hover:underline">
          Announcing TheMinerMag's Stolen Mining Machines Database →
        </Link>
      </div>
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className=" text-white p-2 rounded">
                <Image src={"/logo.png"} width={150} height={150} alt="logo" />
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
                <div className="hidden group-hover:block hover:block absolute bg-white shadow-lg rounded-lg  w-5/6 left-0 right-0 top-15 h-auto m-auto p-2 z-50 ">
                  <ul className="grid grid-cols-5 gap-2 justify-center items-center overflow-hidden  ">
                    {companies.map((company, index) => (
                      <Link
                        key={index}
                        href={`/company/${company}`}
                        className="rounded-lg border   p-4 hover:bg-gray-200">
                        <div className="flex flex-col w-full">
                          <span className="font-bold text-gray-900">
                            {company}
                          </span>
                          <span className="text-gray-600">Stock Price</span>
                        </div>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
              <Link
                className="text-sm font-medium hover:text-blue-600"
                href="/learn">
                LEARN
              </Link>
              <Search />
            </nav>
            <button className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
