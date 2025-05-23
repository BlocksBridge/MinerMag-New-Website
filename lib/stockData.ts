import { createClient } from "@supabase/supabase-js";
import { companies } from "@/app/companiesData";
export async function GetStockProfile() {
  const supabase = createClient(
    "https://supabase.theminermag.com",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0Nzk5Nzg4MCwiZXhwIjo0OTAzNjcxNDgwLCJyb2xlIjoiYW5vbiJ9.1TWq_0FwQFabvEbW3EgaIpQoxaSs97FdpYfmU-8ikew"
  );
  let companyFilter = Object.fromEntries(companies.map((i) => [i, i]));
  let companyProfile = await supabase.from("marketdata").select("");

  if (companyProfile.error == null && companyProfile.data.length) {
    let stockData = companyProfile.data
      .filter(
        (item: { name: string }) =>
          item.name.includes("companyprofile/") &&
          companyFilter[item.name.split("/")[1]]
      )
      .map((item) => {
        let newItem = { ...item };
        newItem.data_points = JSON.parse(newItem["data_points"])[0];
        return newItem;
      });
    return stockData;
  } else {
    return {
      error:
        "Something Went Wrong:" + companyProfile.error + companyProfile.status,
    };
  }
}
