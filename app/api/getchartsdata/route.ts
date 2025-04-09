import { database } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let params = request.nextUrl.searchParams;
  console.log(params);
  if (params.has("company")) {
    let getChartsByCompany = await database
      .from("statistics")
      .select()
      .eq("company", params.get("company")?.toUpperCase());

    if (getChartsByCompany.error) {
      return NextResponse.json(getChartsByCompany.error);
    } else {
      return NextResponse.json(getChartsByCompany.data);
    }
  } else {
    return NextResponse.json("Parameter Missing");
  }
  return NextResponse.json("Request Finished");
}
