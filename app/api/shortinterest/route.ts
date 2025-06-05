import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "process.env.SUPABASE_URL",
  "process.env.SUPABASE_ANON_KEY"
);
export async function POST() {
  let allcompany = await fetch(
    `${process.env.NEXT_PUBLIC_website_url}/api/company`
  )
    .then((res) => res.json())
    .then((res) => res.company);

  let shortInterest = await Promise.all(
    allcompany.map(async (i) => {
      let getData = await fetch(
        ` https://api.nasdaq.com/api/quote/${i}/short-interest?assetClass=stocks`
      ).then((res) => res.json());
      const { data, error } = await supabase
        .from("marketdata")
        .upsert({
          slug: `shortInterest/${i}`,
          name: `shortInterest/${i}`,
          last_updated: new Date().toISOString,
          data_points: JSON.stringify(getData.data.shortInterestTable),
        })
        .eq("slug", `shortInterest/${i}`);
      console.log(getData.data);
      return {
        slug: `shortInterest/${i}`,
        name: `shortInterest/${i}`,
        last_updated: new Date().toISOString,
        data_points: JSON.stringify(getData.data.shortInterestTable),
      };
    })
  );
  return NextResponse.json(shortInterest);
}

export async function GET(req: NextRequest) {
  let companySymbol = req.nextUrl.searchParams;

  if (companySymbol.has("company")) {
    let getShortInterest = await supabase
      .from("marketdata")
      .select("")
      .eq(
        "slug",
        `shortInterest/${companySymbol.get("company")?.toUpperCase()}`
      );

    if (getShortInterest.data) {
      console.log(getShortInterest.data);
      return NextResponse.json({
        data: getShortInterest.data[0],
      });
    } else {
      return NextResponse.json({ data: null });
    }
  } else {
    return NextResponse.json("Requried Parameters Missing");
  }
}
