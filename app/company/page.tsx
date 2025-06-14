import "./[company]/tradingView.css";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnterpriseTable from "./enterpriseTable";
import CompanyTable from "./companyTable";
import { TabsContent } from "@radix-ui/react-tabs";
import "./table.css";
export default async function ConsolidatedCompanies() {
  const getNetworkData = await fetch(
    `${process.env.NEXT_PUBLIC_website_url}/api/networkdata`,
    { next: { revalidate: 3600 } }
  )
    .then((res) => res.json())
    .then((data) => data.data);

  // console.log(getNetworkData, "data");

  const NetworkOverview = getNetworkData.networkOverview.data;
  const BlockReward = getNetworkData.blockReward.data;
  const NetworkDiff = getNetworkData.networkDiff.data;
  return (
    <div className="my-10 m-auto flex justify-center flex-col items-center gap-8 w-5/6">
      <h1 className="font-bold text-2xl">
        {" "}
        Bitcoin Mining Companies Statistics
      </h1>
      {/* Market Data Section */}
      <section className="flex justify-center items-centerm m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {[
            {
              title: "Network Difficulty",
              value: `${NetworkDiff[0]["difficulty"].toLocaleString(
                "en-us",
                {}
              )}`,

              lastUpdated: ` ${`Last Updated: ${new Date(
                NetworkDiff[0].timestamp
              ).toDateString()}`}`,
            },
            {
              title: "Network Hashrate",
              value: `${NetworkOverview.networkHashrate7d.toLocaleString(
                "en-us",
                {
                  minimumFractionDigits: 0,
                }
              )} TH/s`,
              // change: `Fees in Blocks (24h): ${NetworkOverview.feesBlocks24h} BTC`,
              additional: `Est. Difficulty Adjustment: ${NetworkOverview.estDiffAdj}%`,
              changeColor: "text-gray-500",
            },
            {
              title: "Block Reward",
              value: `${BlockReward[0].blockReward} BTC`,
              change: `Last Updated: ${new Date(
                BlockReward[0].timestamp
              ).toDateString()}`,
              changeColor: "text-gray-500",
            },
          ].map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className={`text-sm ${item.changeColor}`}>{item.change}</div>
              {item.additional ? (
                <div className={`text-sm ${item.changeColor}`}>
                  {item.additional}
                </div>
              ) : null}
              {item.lastUpdated ? (
                <div className={`text-sm text-gray-700`}>
                  {item.lastUpdated}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
      <Tabs className="w-full" defaultValue="index">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="index">Trading Data</TabsTrigger>
          <TabsTrigger value="enterprise">Operation Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="index">
          <CompanyTable />
        </TabsContent>
        <TabsContent value="enterprise">
          <EnterpriseTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// export const revalidate = 3600;
export const dynamic = "force-dynamic";
