"use client";

import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [isResultsVisible, setIsResultsVisible] = useState(false);

  useEffect(() => {
    console.log(query);
    if (toggleSearch) {
      (async () => {
        // const fetchResults = await fetch(
        //   `${
        //     process.env.NEXT_PUBLIC_backend_url
        //   }/wp-json/ajax-search-pro/v0/search?s=${String(
        //     query
        //   )}&orderby=date&order=desc`
        // ).then((res) => res.json());
        const fetchResults = await fetch(
          `${
            process.env.NEXT_PUBLIC_backend_url
          }/wp-json/wp/v2/search?search=${String(
            query
          ).toLowerCase()}&orderby=date&order=desc&_embed=true&per_page=5&acf_format=standard`
        ).then((res) => res.json());
        if (fetchResults.length) {
          let ProcessSearchResults = await Promise.all(
            fetchResults.map(async (i) => {
              let getMedia = await fetch(`
                ${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/media/${i["_embedded"]["self"][0]["acf"]["main_image"]}`).then(
                (res) => res.json()
              );
              return { ...i, image: getMedia.guid.rendered };
            })
          );
          setResults(ProcessSearchResults);
          setIsResultsVisible(true);
          setToggleSearch(false);
          // console.log(fetchResults[0]["_embedded"]["self"][0]);
        }
      })();
    }
    console.log(results);
  }, [toggleSearch]);
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        onChange={(evt) => {
          setQuery(evt.target.value);
        }}
        className="w-full px-4 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        onClick={() => {
          setToggleSearch(!toggleSearch);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
        <SearchIcon className="w-5 h-5" />
      </button>

      {isResultsVisible && (
        <div className="w-80 h-[60vh] rounded border border-2 pb-4 right-0 overflow-scroll absolute bg-white shadow-sm">
          <div className="grid grid-cols-1">
            {results.map((item) => (
              <Link
                key={item.id}
                href={item.url.split(".com")[1]}
                target="_blank">
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 transition duration-300 ease-in-out overflow-hidden">
                  <div className="h-40 p-1 w-[100%] relative bg-gray-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      objectFit={"cover"}
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-md font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    {/* <p className="text-sm text-gray-600 mb-4">
                    This is a brief description of the search result {item}. It
                    provides a quick overview of the content.
                  </p> */}
                    <Link
                      href={item.url.split(".com")[1]}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Learn more →
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium">
              View all results
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// function SearchBarWithResults() {
//   // Placeholder function for search

// <div>
//       {isResultsVisible && (
//         <div className="mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//           <div className="p-4">
//             <h3 className="text-sm font-semibold text-gray-700 mb-2">
//               Search Results
//             </h3>
//             <ul className="space-y-2">
//               {[1, 2, 3].map((item) => (
//                 <li
//                   key={item}
//                   className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out">
//                   <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
//                   <div className="flex-grow">
//                     <h4 className="text-sm font-medium text-gray-900">
//                       Result Title {item}
//                     </h4>
//                     <p className="text-xs text-gray-500">
//                       Brief description of the search result {item}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 rounded-b-lg">
//             <a
//               href="#"
//               className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//               View all results
//             </a>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
