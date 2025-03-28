import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'
import { companies } from "@/app/companiesData";

export  async function GET(req: NextRequest, res: NextResponse) {
    const supabase = createClient('https://pllfxvvxgjrdbupxplbp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsbGZ4dnZ4Z2pyZGJ1cHhwbGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzMjUwNzAsImV4cCI6MjAyNzkwMTA3MH0.b4fAV4r_kr5klOC1xHVgGGla8kIa5xFSJTZOjSswPP8')
    let companyFilter = Object.fromEntries(companies.map(i=>([i,i])))
        let companyProfile = await (await supabase.from("marketdata").select(""))
        
    if (companyProfile.error == null && companyProfile.data.length) {
        return NextResponse.json(companyProfile.data.filter((item:{name: string}) => (item.name.includes("companyprofile/") && companyFilter[item.name.split("/")[1]]))) }
    else { return NextResponse.json({error: "Something Went Wrong:" + companyProfile.error + companyProfile.status})}
    }
