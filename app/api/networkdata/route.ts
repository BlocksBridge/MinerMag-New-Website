import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export async function GET(req: NextRequest, res: NextResponse) {
  const supabase = createClient(
    "https://pllfxvvxgjrdbupxplbp.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsbGZ4dnZ4Z2pyZGJ1cHhwbGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzMjUwNzAsImV4cCI6MjAyNzkwMTA3MH0.b4fAV4r_kr5klOC1xHVgGGla8kIa5xFSJTZOjSswPP8"
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
