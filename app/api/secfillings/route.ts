import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { count } from "console";

export async function GET(req: NextRequest, res: NextResponse) {
  let secFilling = req.nextUrl.searchParams;
  const supabase = createClient(
    "https://supabase.theminermag.com",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0Nzk5Nzg4MCwiZXhwIjo0OTAzNjcxNDgwLCJyb2xlIjoiYW5vbiJ9.1TWq_0FwQFabvEbW3EgaIpQoxaSs97FdpYfmU-8ikew"
  );

  if ((secFilling.has("cik"), secFilling.has("date"))) {
    let getSEC = await supabase
      .from("marketdata")
      .select("")
      .eq(
        "slug",
        `secfilling/${secFilling.get("cik")}/${secFilling.get("date")}`
      );
    console.log(getSEC);
    if (getSEC.error) {
      return NextResponse.json({ error: "Something went wrong" });
    } else {
      return NextResponse.json({ data: getSEC.data });
    }
  } else {
    return NextResponse.json("Requried Parameters Missing");
  }
  // // Create a single supabase client for interacting with your database
  //     let getRealizedData  = await supabase.from("statistics").select("").eq("slug", "bitcoin-realized-hashrate-public-mining")
}

export async function POST(req: NextRequest, res: NextResponse) {
  let secFilling = req.nextUrl.searchParams;
  let body = await req.json();
  const supabase = createClient(
    "https://supabase.theminermag.com",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0Nzk5Nzg4MCwiZXhwIjo0OTAzNjcxNDgwLCJyb2xlIjoiYW5vbiJ9.1TWq_0FwQFabvEbW3EgaIpQoxaSs97FdpYfmU-8ikew"
  );
  if (secFilling.has("cik") && secFilling.has("date") && body["summary"]) {
    let setSECData = await supabase
      .from("marketdata")
      .insert({
        slug: `secfilling/${secFilling.get("cik")}/${secFilling.get("date")}`,
        name: `secfilling/${secFilling.get("cik")}/${secFilling.get("date")}`,
        last_updated: new Date().getTime(),
        data_points: JSON.stringify(body),
      })
      .select();
    if (setSECData.error) {
      return NextResponse.json({ error: "Something went wrong" });
    } else {
      return NextResponse.json({
        data: setSECData.data,
        success: setSECData.status,
      });
    }
  } else {
    return NextResponse.json("Requried Parameters Missing");
  }
  // // Create a single supabase client for interacting with your database
  //     let getRealizedData  = await supabase.from("statistics").select("").eq("slug", "bitcoin-realized-hashrate-public-mining")
}
