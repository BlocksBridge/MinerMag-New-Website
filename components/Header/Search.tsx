"use client";

import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [isResultsVisible, setIsResultsVisible] = useState(false);

  useEffect(() => {
    console.log(query);
    if (toggleSearch) {
      (async () => {
        const fetchResults = await fetch(
          `${
            process.env.NEXT_PUBLIC_backend_url
          }/wp-json/ajax-search-pro/v0/search?s=${String(query)}`
        ).then((res) => res.json());
        if (fetchResults.length) {
          setResults(fetchResults);
          setIsResultsVisible(true);
          setToggleSearch(false);
          console.log(fetchResults);
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
        <div className="w-full absolute">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Search Results
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out overflow-hidden">
                <div className="h-40 bg-gray-200"></div>
                <div className="p-4">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Result Title {item}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    This is a brief description of the search result {item}. It
                    provides a quick overview of the content.
                  </p>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Learn more →
                  </a>
                </div>
              </div>
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
