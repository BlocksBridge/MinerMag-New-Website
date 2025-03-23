"use client";

import { useEffect, useState, useRef } from "react";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const searchContainerRef = useRef(null);

  // Debounce search to prevent excessive API calls
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      setIsResultsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close results when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsResultsVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSearchResults = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_backend_url
        }/wp-json/wp/v2/search?search=${encodeURIComponent(
          query.toLowerCase()
        )}&orderby=date&order=desc&_embed=true&per_page=5&acf_format=standard`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

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

        setResults(processedResults);
        setIsResultsVisible(true);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle URL parsing safely
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

  return (
    <div className="relative w-full max-w-md mx-auto" ref={searchContainerRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsResultsVisible(true)}
          className="w-full px-4 py-2 pl-10 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Search"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <SearchIcon className="w-4 h-4" />
        </div>
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        )}
      </div>

      {isResultsVisible && (
        <div className="absolute w-full max-h-[60vh] bg-white border border-gray-200 rounded-lg shadow-lg mt-1 overflow-hidden z-10">
          {results.length > 0 ? (
            <div className="overflow-y-auto max-h-[60vh]">
              {results.map(
                (item: {
                  image: string;
                  id: number;
                  url: string;
                  title: { rendered: string } | string;
                }) => (
                  <Link
                    key={item.id}
                    href={getRelativePath(item.url)}
                    className="block hover:bg-gray-50 transition duration-150 ease-in-out">
                    <div className="flex border-b border-gray-100 p-3">
                      <div className="h-20 w-20 relative flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={item.image.replace(
                            "https://theminermag.com",
                            "https://backend.theminermag.com"
                          )}
                          alt={item.title?.rendered || "Search result"}
                          fill
                          sizes="80px"
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col justify-center">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {item.title?.rendered || item.title || "Untitled"}
                        </h4>
                        <p className="text-xs text-blue-600 mt-1">
                          View details →
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              {isLoading ? "Searching..." : "No results found"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
