import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'
import { NormaliseMinerMagData } from "@/lib/utils";
export  async function GET(req: NextRequest, res: NextResponse) {

// Create a single supabase client for interacting with your database
    const supabase = createClient('https://pllfxvvxgjrdbupxplbp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsbGZ4dnZ4Z2pyZGJ1cHhwbGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzMjUwNzAsImV4cCI6MjAyNzkwMTA3MH0.b4fAV4r_kr5klOC1xHVgGGla8kIa5xFSJTZOjSswPP8')
    let getRealizedData  = await supabase.from("statistics").select("").eq("slug", "bitcoin-realized-hashrate-public-mining")
    let getPriceHashRatio =  await supabase.from("statistics").select("").eq("slug", "price-hash-ratio-bitcoin-mining")
    let getBitcoinHoldings =  await supabase.from("statistics").select("").eq("slug", "bitcoin-mining-company-month-recap")
    let realizedData = NormaliseMinerMagData(getRealizedData)
    let PriceHashRatio = NormaliseMinerMagData(getPriceHashRatio)
    let bitcoinHoldings = NormaliseMinerMagData(getBitcoinHoldings)
    
  return NextResponse.json({ realizedHashrate: realizedData, priceHashratio: PriceHashRatio, bitcoinHoldings: bitcoinHoldings});
}
