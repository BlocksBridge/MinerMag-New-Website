import { companies } from "./companiesData";
import { createClient } from "@supabase/supabase-js";


    const supabase = createClient('https://pllfxvvxgjrdbupxplbp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsbGZ4dnZ4Z2pyZGJ1cHhwbGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzMjUwNzAsImV4cCI6MjAyNzkwMTA3MH0.b4fAV4r_kr5klOC1xHVgGGla8kIa5xFSJTZOjSswPP8')

async function seedEnterprise() {
    let seedEnterpriseData = await Promise.all(
        companies.map(async (companySymbol) => {
          let call = await fetch(
            `https://financialmodelingprep.com/api/v3/enterprise-values/${companySymbol}/?period=quarter&apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb`
          ).then((res) => res.json());
          let pushData = await supabase.from("marketdata").insert({name: `enterpriseValue/${companySymbol}`, slug: `enterprisevalue/${companySymbol}`, data_points: JSON.stringify(call), last_updated: new Date().getTime()})
          console.log(pushData.status, pushData.data, pushData)
        }))

    
    }

    async function seedMarket() {
        let seedMarketData = await Promise.all(
            companies.map(async (companySymbol) => {
              let call = await fetch(
                `https://financialmodelingprep.com/api/v3/quote-order/${companySymbol}?apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb`
              ).then((res) => res.json());
              let pushData = await supabase.from("marketdata").insert({name: `marketdata/${companySymbol}`, slug: `marketdata/${companySymbol}`, data_points: JSON.stringify(call), last_updated: new Date().getTime()})
              console.log(pushData.status, pushData.data, pushData)
            }))
    
        
        }
seedMarket()
seedEnterprise()