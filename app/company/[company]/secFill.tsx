import Link from "next/link";
import { FileText, Bot, ChevronRight } from "lucide-react";

interface SECFiling {
  id: string;
  type: string;
  date: string;
  title: string;
}

const filings: SECFiling[] = [
  { id: "1", type: "10-K", date: "2023-03-15", title: "Annual Report" },
  { id: "2", type: "10-Q", date: "2023-06-30", title: "Quarterly Report" },
  { id: "3", type: "8-K", date: "2023-07-15", title: "Current Report" },
  { id: "4", type: "DEF 14A", date: "2023-04-01", title: "Proxy Statement" },
];

export default async function SECFilingsSection({ company }) {
  const formatDate = (date) => date.toISOString().slice(0, 10);

  const currentDate = formatDate(new Date());
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const sixMonthsAgoDate = formatDate(sixMonthsAgo);

  console.log(company);
  let getFillings = await fetch(
    `https://sandbox.financialmodelingprep.com/stable/sec-filings-search/symbol?symbol=${company.toUpperCase()}&from=${sixMonthsAgoDate}&to=${currentDate}&limit=6&apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb`
  )
    .then((res) => res.json())
    .catch((i) => console.log(i));
  console.log(getFillings.length, getFillings);
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">SEC Filings</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {getFillings.map((filing) => (
              <li
                key={filing.sybol}
                className="p-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-center">
                  <Link
                    href={`/sec-filings/${filing.link}`}
                    className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Type {filing.formType}
                      </p>
                      <p className="font-medium text-gray-900">
                        cik: {filing.cik}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(filing.filingDate).toLocaleDateString()}{" "}
                        {new Date(filing.acceptedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                  <div className="flex space-x-4 items-center">
                    <Link
                      href={`${filing.link}`}
                      className="text-blue-600 hover:text-blue-800">
                      View Filing
                    </Link>
                    <Link
                      href={`/company/${company.toUpperCase()}/sec/${
                        filing.formType
                      }/${filing.filingDate.split(" ")[0]}`}
                      className="inline-flex items-center text-green-600 hover:text-green-800">
                      <Bot className="w-4 h-4 mr-1" />
                      AI Summary
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex justify-end">
          <Link
            href="/all-summaries"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            View All Summaries
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
