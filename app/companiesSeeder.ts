import { companies } from "./companiesData";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

async function seedEnterprise() {
  let seedEnterpriseData = await Promise.all(
    companies.map(async (companySymbol) => {
      let call = await fetch(
        `https://financialmodelingprep.com/api/v3/enterprise-values/${companySymbol}/?period=quarter&apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb`
      ).then((res) => res.json());
      let pushData = await supabase.from("marketdata").insert({
        name: `enterpriseValue/${companySymbol}`,
        slug: `enterprisevalue/${companySymbol}`,
        data_points: JSON.stringify(call),
        last_updated: new Date().getTime(),
      });
      console.log(pushData.status, pushData.data, pushData);
    })
  );
}

async function seedMarket() {
  let seedMarketData = await Promise.all(
    companies.map(async (companySymbol) => {
      let call = await fetch(
        `https://financialmodelingprep.com/api/v3/quote-order/${companySymbol}?apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb`
      ).then((res) => res.json());
      let pushData = await supabase.from("marketdata").insert({
        name: `marketdata/${companySymbol}`,
        slug: `marketdata/${companySymbol}`,
        data_points: JSON.stringify(call),
        last_updated: new Date().getTime(),
      });
      console.log(pushData.status, pushData.data, pushData);
    })
  );
}

async function seedCompanyProfile() {
  // `https://financialmodelingprep.com/stable/profile?symbol=${i.toUpperCase()}&apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb
  let seedMarketData = await Promise.all(
    companies.map(async (companySymbol) => {
      let call = await fetch(
        `https://financialmodelingprep.com/stable/profile?symbol=${companySymbol.toUpperCase()}&apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb`
      ).then((res) => res.json());
      let pushData = await supabase.from("marketdata").insert({
        name: `companyprofile/${companySymbol.toUpperCase()}`,
        slug: `companyprofile/${companySymbol.toUpperCase()}`,
        data_points: JSON.stringify(call),
        last_updated: new Date().getTime(),
      });
      console.log(pushData.status, pushData.data, pushData);
    })
  );
}

async function removeCompanyProfile() {
  // `https://financialmodelingprep.com/stable/profile?symbol=${i.toUpperCase()}&apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb
  let seedMarketData = await Promise.all(
    companies.map(async (companySymbol) => {
      //   let call = await fetch(
      //     `https://financialmodelingprep.com/stable/profile?symbol=${companySymbol.toUpperCase()}&apikey=lR21jz4oPnIf9rgJCON4bDDLyZJ2sTXb`
      //   ).then((res) => res.json());
      let pushData = await supabase
        .from("marketdata")
        .delete()
        .eq("slug", `companyprofile/${companySymbol.toUpperCase()}`);
      console.log(pushData.status, pushData.data, pushData);
    })
  );
}
seedCompanyProfile();
// seedMarket()
// seedEnterprise()

// removeCompanyProfile()
