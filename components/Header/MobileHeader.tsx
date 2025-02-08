"use client";
import Link from "next/link";
import { ChevronDown, Building2, ChevronUp, Menu, X } from "lucide-react";
import { useState } from "react";
export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="">
      {" "}
      {/* Mobile Menu Button */}
      <label
        className="md:hidden p-2 cursor-pointer"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsMenuOpen(!isMenuOpen)}>
        <input
          type="checkbox"
          className="hidden peer"
          checked={isMenuOpen}
          onChange={(e) => setIsMenuOpen(e.target.checked)}
        />
        <div className="peer-checked:hidden">
          <Menu className="h-6 w-6" />
        </div>
        <div className="right-0 hidden peer-checked:block">
          <X className="h-6 w-6" />
        </div>
      </label>
      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-x-0 top-[4rem] bottom-0 bg-white border-t z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <nav className="px-2 pt-2 pb-4 space-y-1">
          <Link
            href="/news"
            target="_parent"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors">
            NEWS
          </Link>
          <Link
            target="_parent"
            href="https://pro.theminermag.com/"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors">
            DATA
          </Link>
          <div className="relative">
            <Link
              target="_parent"
              href="/company"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors">
              COMPANIES
            </Link>
          </div>
          <Link
            target="_parent"
            href="/learn"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors">
            LEARN
          </Link>
          <div className="px-3 py-2"></div>
        </nav>
      </div>
    </div>
  );
}
