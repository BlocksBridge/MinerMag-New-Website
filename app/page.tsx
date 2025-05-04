import HomePage from "@/components/Home/Home";
import { headers } from "next/headers";

export default async function Page({ searchParams }) {
  const headersList = await headers();

  let par = await searchParams;

  const getPosts: [any] = await fetch(
    `${
      process.env.NEXT_PUBLIC_backend_url
    }/wp-json/wp/v2/posts?acf_format=standard&_=${Date.now()}`,
    { next: { revalidate: 3600 } }
  ).then((res) => res.json());

  // console.log("par", getPosts[0]);
  // const getBitcoinPrice = await fetch(
  //   "https://api.hashrateindex.com/v1/hashrateindex/coin/bitcoin/price",
  //   { headers: { "X-Hi-Api-Key": "hi.72efa27d0f82a2541260cfb351e3adc7" } }
  // ).then((res) => res.json());

  const getNetworkData = await fetch(
    `${process.env.NEXT_PUBLIC_website_url}/api/networkdata`,
    { next: { revalidate: 3600 } }
  )
    .then((res) => res.json())
    .then((data) => data.data);

  const NetworkOverview = getNetworkData.networkOverview.data;
  const BlockReward = getNetworkData.blockReward.data;
  const NetworkDiff = getNetworkData.networkDiff.data;
  const BitcoinPrice = getNetworkData.bitcoinPrice.data;
  return (
    <HomePage
      getPosts={getPosts}
      BitcoinData={BitcoinPrice}
      NetworkOverview={NetworkOverview}
      NetworkDiff={NetworkDiff}
      BlockReward={BlockReward}
    />
  );
}

export const revalidate = 3600; // invalidate every hour
