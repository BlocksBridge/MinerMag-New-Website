import Link from "next/link";
import { Facebook, Linkedin, Search, Twitter } from "lucide-react";
import { geistMono, geistSans } from "@/app/fonts/fonts";

export default function Footer() {
  return (
    <footer className={`bg-white border-t ${geistMono.className} `}>
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
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </button>
              <button variant="ghost" size="icon">
                <Linkedin className="h-4 w-4" />
              </button>
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
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          © 2024 TheMinerMag. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
