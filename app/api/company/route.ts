import { NextRequest, NextResponse } from "next/server";
import { companies } from "../../companiesData";

export  async function GET(req: NextRequest, res: NextResponse) {
    return NextResponse.json({company: companies})
// // Create a single supabase client for interacting with your database
//     let getRealizedData  = await supabase.from("statistics").select("").eq("slug", "bitcoin-realized-hashrate-public-mining")
    }
