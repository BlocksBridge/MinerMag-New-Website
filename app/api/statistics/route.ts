import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { NormaliseMinerMagData } from "@/lib/utils";
export async function GET(req: NextRequest, res: NextResponse) {
  // Create a single supabase client for interacting with your database
  const supabase = createClient(
    "https://supabase.theminermag.com",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0Nzk5Nzg4MCwiZXhwIjo0OTAzNjcxNDgwLCJyb2xlIjoiYW5vbiJ9.1TWq_0FwQFabvEbW3EgaIpQoxaSs97FdpYfmU-8ikew"
  );
  let getRealizedData = await supabase
    .from("statistics")
    .select("")
    .eq("slug", "bitcoin-realized-hashrate-public-mining");
  let getPriceHashRatio = await supabase
    .from("statistics")
    .select("")
    .eq("slug", "price-hash-ratio-bitcoin-mining");
  let getBitcoinHoldings = await supabase
    .from("statistics")
    .select("")
    .eq("slug", "bitcoin-mining-company-month-recap");
  let getRealizationRate = await supabase
    .from("statistics")
    .select("")
    .eq("slug", "bitcoin-hashrate-realization-rate");
  let realizedData = NormaliseMinerMagData(getRealizedData);
  let PriceHashRatio = NormaliseMinerMagData(getPriceHashRatio);
  let bitcoinHoldings = NormaliseMinerMagData(getBitcoinHoldings);
  let realizationRate = NormaliseMinerMagData(getRealizationRate);
  // console.log(realizationRate)

  return NextResponse.json({
    realizedHashrate: realizedData,
    priceHashratio: PriceHashRatio,
    bitcoinHoldings: bitcoinHoldings,
    realizationRate: realizationRate,
  });
}
