import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { companies } from "../../companiesData";

export async function GET(req: NextRequest, res: NextResponse) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
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
    return NextResponse.json(stockData);
  } else {
    return NextResponse.json({
      error:
        "Something Went Wrong:" + companyProfile.error + companyProfile.status,
    });
  }
}
export const dynamic = "force-dynamic";
