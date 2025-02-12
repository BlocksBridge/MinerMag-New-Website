import Link from "next/link";
import { FileText, ArrowLeft, Loader } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { remark } from "remark";
import html from "remark-html";
import remarkHtml from "remark-html";
export default async function SummarisedSEC({
  params,
}: {
  params: { company: string; cik: string; date: string };
}) {
  let AI = new GoogleGenerativeAI("AIzaSyDZN0xhTvobHOt89PYoNxa4WZRq_8VrAe4");
  const model = AI.getGenerativeModel({ model: "gemini-2.0-flash" });

  let paths = await params;
  console.log(paths);
  let newDate = paths.date.split("-");
  let oneDayExtra = new Date(paths.date);
  oneDayExtra.setDate(oneDayExtra.getDate() + 1);
  console.log(oneDayExtra);

  let getFillings: [any] = await fetch(
    `https://sandbox.financialmodelingprep.com/stable/sec-filings-search/symbol?symbol=${
      paths.company
    }&from=${paths.date}&to=${oneDayExtra
      .toISOString()
      .slice(0, 10)}&apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb`
  )
    .then((res) => res.json())
    .catch((e) => {
      console.log(e, "error");
    });
  console.log(getFillings, Boolean(getFillings));
  if (getFillings && getFillings.length) {
    let findCorrectFiling = getFillings.filter((i) => {
      if (i.formType == params.cik && i.filingDate.includes(params.date)) {
        return i;
      }
    });

    let data = await fetch(findCorrectFiling[0].finalLink, {
      headers: { "User-Agent": "TheMinerMag Support Contact@theminermag.com" },
    }).then((res) => res.text());
    console.log(data.length);
    let getSummary = await model.generateContent(
      `Generate a Detailed Summary For this SEC Filling: ${data}`
    );
    console.log(getSummary.response.text());
    let response = getSummary.response.text();
    let res = await remark()
      .use(remarkHtml)
      .process(response)
      .then((res) => {
        console.log("ress", res);
        return res;
      });
    console.log(res);
    return (
      <>
        {" "}
        <div className="min-h-screen bg-gray-100 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link
              href="/sec-filings"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to SEC Filings
            </Link>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-2">
                  {filing.type}: {filing.title}
                </h1>
                <p className="text-gray-600 mb-4">Filed on {filing.date}</p>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Summary</h2>

                  <p
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: res.value }}></p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Key Points</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {filing.keyPoints.map((point, index) => (
                      <li key={index} className="text-gray-700">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <Link
                  href={findCorrectFiling[0].finalLink}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800">
                  <FileText className="w-5 h-5 mr-2" />
                  View Original SEC Filing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <h1>Naa, not found</h1>;
  }
}

let filing = {
  id: 32,
  type: "10-K",
  date: "2023-03-15",
  title: "Annual Report",
  summary:
    "This 10-K filing provides a comprehensive overview of the company's financial performance and position for the fiscal year ended December 31, 2022. The company reported strong revenue growth, driven by increased market share in key segments and successful product launches. However, challenges such as supply chain disruptions and inflationary pressures have impacted profit margins. The management team has outlined strategic initiatives to address these challenges and capitalize on emerging opportunities in the coming year.",
  keyPoints: [
    "Revenue increased by 15% year-over-year to $1.2 billion",
    "Operating margin decreased from 18% to 16% due to higher input costs",
    "R&D expenses grew by 20%, focusing on AI and sustainable technologies",
    "The company completed two strategic acquisitions to expand its product portfolio",
    "A new share repurchase program of $500 million was authorized",
  ],
};
