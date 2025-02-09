import Link from "next/link";
import { Facebook, Linkedin, Search, Twitter } from "lucide-react";
import { geistMono, geistSans } from "@/app/fonts/fonts";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className={`bg-white border-t ${geistMono.className} `}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-4">About Us</h3>
            <Image
              src={"/logo.png"}
              width={200}
              height={200}
              alt="TheMinerMag Logo"
            />
            <p className="text-sm text-justify text-gray-600 mt-5">
              TheMinerMag is a bitcoin mining news and research platform brought
              to you by BlocksBridge Consulting, a public relations firm
              dedicated to the bitcoin mining industry. TheMinerMag operates
              with full editorial independence, delivering accurate, data-driven
              insights and unbiased analysis on industry trends.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <Link href="/" className="block text-sm hover:text-blue-600">
                Home
              </Link>
              <Link href="/news" className="block text-sm hover:text-blue-600">
                News
              </Link>
              <Link
                href="/company"
                className="block text-sm hover:text-blue-600">
                Market Data
              </Link>
              <Link href="/learn" className="block text-sm hover:text-blue-600">
                Learn
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                target="_blank"
                href="https://x.com/theminermag_"
                variant="ghost"
                size="icon">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/company/theminermag"
                variant="ghost"
                size="icon">
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4"></h3>
            <div className="space-y-2 flex flex-col">
              <Link
                href={"https://substack.com/@blocksbridge"}
                target="_blank"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Subscribe To Newsletter
              </Link>
              <Link
                href={"https://t.me/TheMinerMag"}
                target="_blank"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Join Telegram Channel
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          © 2024 TheMinerMag. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
