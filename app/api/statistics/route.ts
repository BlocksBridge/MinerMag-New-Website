import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'

export  async function GET(req: NextRequest, res: NextResponse) {

// Create a single supabase client for interacting with your database
    const supabase = createClient('https://pllfxvvxgjrdbupxplbp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsbGZ4dnZ4Z2pyZGJ1cHhwbGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzMjUwNzAsImV4cCI6MjAyNzkwMTA3MH0.b4fAV4r_kr5klOC1xHVgGGla8kIa5xFSJTZOjSswPP8')
    let getRealizedData  = await (await supabase.from("statistics").select("").eq("slug", "bitcoin-realized-hashrate-public-mining"))
    console.log(getRealizedData.data)
    let header = getRealizedData.data[0].data_points[0]
    let realizedData = {}
    header.forEach(i=>realizedData[i]={})
    getRealizedData.data[0].data_points.slice(1, getRealizedData.data[0].data_points.length).forEach(i=> {
        i.forEach((item, index) => {
            if (index == 0) {} else {
            realizedData[header[index]][i[0]] = item
            }
        })
    })
    
  return NextResponse.json({ realizedHashrate: realizedData });
}
