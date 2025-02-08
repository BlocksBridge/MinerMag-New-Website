import "./[company]/tradingView.css";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnterpriseTable from "./enterpriseTable";
import CompanyTable from "./companyTable";
import { TabsContent } from "@radix-ui/react-tabs";
export default function ConsolidatedCompanies() {
  return (
    <div className="my-10 m-auto flex justify-center flex-col items-center gap-8 w-5/6">
      <h1 className="font-bold"> Bitcoin Mining Companies Stats</h1>
      <Tabs className="w-full" defaultValue="index">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="index">Market Cap</TabsTrigger>
          <TabsTrigger value="enterprise">Operations Metrics</TabsTrigger>
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
