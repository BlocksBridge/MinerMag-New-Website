import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest, res: NextResponse) {
  let companySymbol = req.nextUrl.searchParams;
  const supabase = createClient(
    "process.env.SUPABASE_URL",
    "process.env.SUPABASE_ANON_KEY"
  );

  if (companySymbol.has("company")) {
    let companyProfile = await supabase
      .from("marketdata")
      .select("")
      .eq(
        "slug",
        `companyprofile/${companySymbol.get("company")?.toUpperCase()}`
      );
    if (companyProfile.error || !companyProfile.data.length) {
      return NextResponse.json({ error: "Something went wrong" });
    } else {
      return NextResponse.json({
        data: JSON.parse(companyProfile.data[0].data_points),
      });
    }
  } else {
    return NextResponse.json("Requried Parameters Missing");
  }
  // // Create a single supabase client for interacting with your database
  //     let getRealizedData  = await supabase.from("statistics").select("").eq("slug", "bitcoin-realized-hashrate-public-mining")
}
