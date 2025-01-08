import Link from "next/link";
import Image from "next/image";
import Search from "./Search";
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
