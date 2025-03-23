// app/search/page.js
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Search as SearchIcon,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query);
  const resultsPerPage = 10;

  useEffect(() => {
    if (query) {
      fetchResults();
    } else {
      setIsLoading(false);
    }
  }, [query, page]);

  const fetchResults = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_backend_url
        }/wp-json/wp/v2/search?search=${encodeURIComponent(
          query.toLowerCase()
        )}&orderby=date&order=desc&_embed=true&per_page=${resultsPerPage}&page=${page}&acf_format=standard`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Get total from headers
      const totalItems = parseInt(
        response.headers.get("X-WP-Total") || "0",
        10
      );
      const totalPagesCount = parseInt(
        response.headers.get("X-WP-TotalPages") || "0",
        10
      );

      setTotalResults(totalItems);
      setTotalPages(totalPagesCount);

      const fetchResults = await response.json();

      if (fetchResults.length) {
        const processedResults = await Promise.all(
          fetchResults.map(async (item) => {
            try {
              // Check if required nested properties exist
              if (!item._embedded?.self?.[0]?.acf?.main_image) {
                return {
                  ...item,
                  image: "/placeholder-image.jpg", // Fallback image path
                };
              }

              const mediaResponse = await fetch(
                `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/media/${item._embedded.self[0].acf.main_image}`
              );

              if (!mediaResponse.ok) {
                throw new Error("Failed to fetch media");
              }

              const mediaData = await mediaResponse.json();
              return {
                ...item,
                image: mediaData.guid?.rendered || "/placeholder-image.jpg",
              };
            } catch (error) {
              console.error("Error processing search result:", error);
              return {
                ...item,
                image: "/placeholder-image.jpg", // Fallback image on error
              };
            }
          })
        );

        setSearchResults(processedResults);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getRelativePath = (url) => {
    try {
      if (!url) return "/";
      const urlObj = new URL(url);
      return urlObj.pathname + urlObj.search + urlObj.hash;
    } catch (e) {
      console.error("Invalid URL:", url);
      return "/";
    }
  };

  const navigateToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Search Results</h1>

      {/* Search input */}
      <div className="mb-8">
        <form
          onSubmit={handleSearchSubmit}
          className="relative max-w-lg mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-3 pl-10 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <SearchIcon className="w-5 h-5" />
          </div>
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition">
            Search
          </button>
        </form>
      </div>

      {/* Results summary */}
      {query && (
        <div className="mb-6">
          <p className="text-gray-600">
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Searching for "{query}"...
              </span>
            ) : (
              <span>
                Found {totalResults} result{totalResults !== 1 ? "s" : ""} for "
                {query}"
              </span>
            )}
          </p>
        </div>
      )}

      {/* Results list */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          {searchResults.length > 0 ? (
            searchResults.map((result: { image: string }) => (
              <Link
                key={result.id}
                href={getRelativePath(result.url)}
                className="block bg-white rounded-lg shadow hover:shadow-md transition duration-150 ease-in-out overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-48 md:h-auto relative bg-gray-200">
                    <Image
                      src={result.image.replace(
                        "https://theminermag.com",
                        process.env.NEXT_PUBLIC_backend_url
                      )}
                      alt={result.title?.rendered || "Search result"}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-3/4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {result.title?.rendered || result.title || "Untitled"}
                    </h2>
                    {result._embedded?.self?.[0]?.excerpt?.rendered && (
                      <div
                        className="text-gray-600 mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: result._embedded.self[0].excerpt.rendered,
                        }}
                      />
                    )}
                    <div className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                      Read more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : query ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any results for "{query}". Please try another
                search term.
              </p>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium">
                Return to home
              </Link>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">
                Enter a search term to begin
              </h3>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => navigateToPage(page - 1)}
              disabled={page <= 1}
              className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                page <= 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}>
              <ChevronLeft className="w-5 h-5" />
              <span className="sr-only">Previous</span>
            </button>

            {/* Page numbers */}
            <div className="hidden md:flex">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Calculate which page numbers to show
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => navigateToPage(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      page === pageNum
                        ? "bg-blue-50 border-blue-500 text-blue-600 z-10"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}>
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Current page indicator for mobile */}
            <div className="flex md:hidden items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              Page {page} of {totalPages}
            </div>

            <button
              onClick={() => navigateToPage(page + 1)}
              disabled={page >= totalPages}
              className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                page >= totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}>
              <span className="sr-only">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
