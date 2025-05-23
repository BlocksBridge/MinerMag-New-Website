import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest, res: NextResponse) {
  let companySymbol = req.nextUrl.searchParams;
  const supabase = createClient(
    "https://supabase.theminermag.com",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0Nzk5Nzg4MCwiZXhwIjo0OTAzNjcxNDgwLCJyb2xlIjoiYW5vbiJ9.1TWq_0FwQFabvEbW3EgaIpQoxaSs97FdpYfmU-8ikew"
  );

  if (companySymbol.has("company")) {
    let getEnterpriseData = await supabase
      .from("marketdata")
      .select("")
      .eq(
        "slug",
        `enterprisevalue/${companySymbol.get("company")?.toUpperCase()}`
      );
    if (getEnterpriseData.error || !getEnterpriseData.data.length) {
      return NextResponse.json({ error: "Something went wrong" });
    } else {
      return NextResponse.json({
        data: JSON.parse(getEnterpriseData.data[0].data_points),
      });
    }
  } else {
    return NextResponse.json("Requried Parameters Missing");
  }
  // // Create a single supabase client for interacting with your database
  //     let getRealizedData  = await supabase.from("statistics").select("").eq("slug", "bitcoin-realized-hashrate-public-mining")
}
