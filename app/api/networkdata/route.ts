import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export async function GET(req: NextRequest, res: NextResponse) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
  let getNetworkData = await supabase
    .from("marketdata")
    .select("")
    .eq("slug", `network`);

  if (getNetworkData.error || !getNetworkData.data.length) {
    return NextResponse.json({ error: "Something went wrong" });
  } else {
    return NextResponse.json({
      data: JSON.parse(getNetworkData.data[0].data_points),
    });
  }
}
// // Create a single supabase client for interacting with your database
//     let getRealizedData  = await supabase.from("statistics").select("").eq("slug", "bitcoin-realized-hashrate-public-mining")
