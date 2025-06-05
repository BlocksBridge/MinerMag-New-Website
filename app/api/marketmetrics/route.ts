import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { NormaliseMinerMagData } from "@/lib/utils";
import { access } from "node:fs";
export async function GET(req: NextRequest, res: NextResponse) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  let getHashrate = await supabase
    .from("statistics")
    .select("")
    .eq("slug", `bitcoin-realized-hashrate-public-mining`);
  let getTotalHoldings = await supabase
    .from("statistics")
    .select("")
    .eq("slug", `monthly-summary-bitcoin-mining-companies`);

  let holdingPoints = getTotalHoldings.data[0].data_points;
  function findIndexArray(toCheck, data) {
    return data.findIndex((i) => {
      return toCheck == i;
    });
  }
  if (getHashrate.error || !getHashrate.data.length || getTotalHoldings.error) {
    return NextResponse.json({ error: "Something went wrong" });
  } else {
    const consolidatedhashrate = getHashrate.data[0].data_points[1].reduce(
      (accumulator, currentValue) => {
        const num = parseFloat(currentValue);

        if (!isNaN(num) && num !== null) {
          return accumulator + num;
        }
        return accumulator;
      },
      0
    );

    return NextResponse.json({
      totalhashrate: consolidatedhashrate.toFixed(2),
      totalholding:
        holdingPoints[holdingPoints.length - 1][
          findIndexArray("Holdings (BTC)", holdingPoints[0])
        ],
      marketShareByProduction:
        holdingPoints[holdingPoints.length - 1][
          findIndexArray("Market Share by Production (%)", holdingPoints[0])
        ],
      updated: new Date().toDateString(),
    });
  }
}
// // Create a single supabase client for interacting with your database
//     let getRealizedData  = await supabase.from("statistics").select("").eq("slug", "bitcoin-realized-hashrate-public-mining")
