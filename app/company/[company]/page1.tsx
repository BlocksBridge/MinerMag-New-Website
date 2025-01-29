import Image from "next/image";
import Link from "next/link";
import Groq from "groq-sdk";
import OpenAI from "openai";
// This would typically come from a database or API
import parse from "rss-to-json";
import TradingView from "./tradingView";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SingleTicker } from "react-ts-tradingview-widgets";
export default async function CompanyPage({
  params,
  searchParams,
}: {
  params: { company: string };
}) {
  const param = await params;

  //   let getCompanyInfoThroughAI = await
  let getCompanyArticles = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/posts?search=${param.company}&acf_format=standard`
  ).then((res) => res.json());

  let getCompanyDetails = await fetch(
    `https://financialmodelingprep.com/api/v3/profile/${param.company}?apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb`
  ).then((res) => res.json());

  // console.log(getCompanyArticles, "getCompanyArticles");
  let getNewswire = await parse(
    "https://ir.mara.com/news-events/press-releases/rss"
  );
  // console.log(getNewswire, "getNewswire");
  // const groq = new Groq({ apiKey: process.env.GROQ_KEY });
  // let generateQuery = await groq.chat.completions.create({
  //   response_format: { type: "json_object" },
  //   model: "mixtral-8x7b-32768",
  //   messages: [
  //     {
  //       role: "system",
  //       content: `Your Task is to find information about the Listed Company Name which i'll give you, there should be only string and no other datatypes. the company is in bitcoin mining industry, you should provide information about what it does, headquarters, revenue and all of the details in JSON format with following keys : [company, about, description, revenue, headquater, goals, market trends] `,
  //     },
  //     {
  //       role: "user",
  //       content: `Here is the company name: ${param.company}`,
  //     },
  //   ],
  // });

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
    organization: process.env.OPENAI_ORG,
  });
  let generateQuery = await openai.chat.completions.create({
    response_format: { type: "json_object" },
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Your Task is to find information about the Listed Company Name which i'll give you, there should be only string and no other datatypes. the company is in bitcoin mining industry, you should provide information about what it does, headquarters, revenue and all of the details in JSON format with following keys : [company, about, description, revenue, headquater, goals, market trends] `,
      },
      {
        role: "user",
        content: `Here is the company name: ${param.company}`,
      },
    ],
  });

  let formattedQuery = JSON.parse(generateQuery.choices[0].message.content);
  console.log(getCompanyDetails);
  return (
    <div className="w-10/12 m-auto py-6 px-4 sm:px-6 lg:px-8 ">
      {/* Subheader */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-gray-900 capitalize">
            {param.company.split("-").join(" ")}
          </h2>
        </div>
        <Link href="/company" className="text-sm text-blue-600 hover:underline">
          ← Back to Companies
        </Link>
      </div>
      <div className="shadow   my-2 flex flex-col gap-3 mb-8">
        <p className="text-gray-600"></p>

        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            <div className="flex flex-col">
              <div className="flex  gap-4 justify-evenly text-lg">
                <p>Price</p>
                <p>
                  {getCompanyDetails[0].price.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                  })}
                  $
                </p>
              </div>
              <div className="flex  p-1 gap-4 justify-evenly text-lg">
                <p>Market Cap</p>
                <p>{getCompanyDetails[0].mktCap}$</p>
              </div>
              <div className="flex   gap-4 justify-evenly text-lg">
                <p>Exchange</p>
                <p>{getCompanyDetails[0].exchangeShortName}</p>
              </div>
              <div className="flex   gap-4 justify-evenly text-lg">
                <p>Employees</p>
                <p>{getCompanyDetails[0].fullTimeEmployees}</p>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            {" "}
            <TradingView
              symbol={param.company}
              formattedQuery={formattedQuery}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="shadow rounded-lg py-6 px-4 ">
        <h3 className="text-xl font-semibold mb-4">Latest Articles</h3>
        <div className="space-y-6">
          {getCompanyArticles.slice(0, 3).map((article) => (
            <div key={article.id} className="border-b pb-4 last:border-b-0">
              <h4 className="text-lg font-semibold mb-2">
                <Link
                  href={article.link.split(".com")[1]}
                  className="text-blue-600 hover:underline">
                  {article.title.rendered}
                </Link>
              </h4>
              <p className="text-sm text-gray-500 mb-2">
                Published on{" "}
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p
                className="text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: article.excerpt.rendered.slice(0, 200) + "...",
                }}></p>
            </div>
          ))}
          <button className="border-black px-3 py-2 shadow m-auto rounded">
            Load More
          </button>
        </div>
      </div>

      <div className="shadow rounded-lg py-6 px-4 ">
        <h3 className="text-xl font-semibold mb-4">Newswire</h3>
        <div className="space-y-6">
          {getNewswire.items.slice(0, 5).map((article) => (
            <div key={article.title} className="border-b pb-4 last:border-b-0">
              <h4 className="text-lg font-semibold mb-2">
                <Link
                  href={article.link}
                  className="text-blue-600 hover:underline">
                  {article.title}
                </Link>
              </h4>
              <p className="text-sm text-gray-500 mb-2">
                Published on{" "}
                {new Date(article.published).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export async function generateMetadata({ params, searchParams }) {
  const param = await params;
  return { title: param.company.split("-").join(" ") + " By TheMinerMag" };
}

export async function generateStaticParams() {
  const companies = [
    "MARA",
    "RIOT",
    "CORZ",
    "BTDR",
    "CLSK",
    "IREN",
    "HUT",
    "WULF",
    "PHX",
    "CIFR",
    "FUFU",
    "BITF",
    "BTBT",
    "CAN",
    "CANG",
    "HIVE",
    "SDIG", // To be removed once merger with Bitfarms is complete
    "ARBK",
    "BTCM",
    "GRYP",
    "SOS",
    "SLNH",
    "GREE",
    "LMFA",
    "MIGI",
    "BTOG",
    "DGHI",
    "DMGI",
    "ANY",
    "NB2",
  ];

  return companies.map((company) => ({ company }));
}
