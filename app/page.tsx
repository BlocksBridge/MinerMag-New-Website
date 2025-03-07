import HomePage from "@/components/Home/Home";

export default async function Page() {
  const getPosts: [any] = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/posts?acf_format=standard`,
    {
      cache: "no-store",
      next: { tags: ["posts"] },
    }
  ).then((res) => res.json());
  const getBitcoinPrice = await fetch(
    "https://api.hashrateindex.com/v1/hashrateindex/coin/bitcoin/price",
    { headers: { "X-Hi-Api-Key": "hi.72efa27d0f82a2541260cfb351e3adc7" } }
  ).then((res) => res.json());

  const getNetworkData = await fetch(
    `${process.env.NEXT_PUBLIC_website_url}/api/networkdata`
  )
    .then((res) => res.json())
    .then((data) => data.data);

  const NetworkOverview = getNetworkData.networkOverview.data;
  const BlockReward = getNetworkData.blockReward.data;
  const NetworkDiff = getNetworkData.networkDiff.data;
  console.log(NetworkDiff);
  return (
    <HomePage
      getPosts={getPosts}
      BitcoinData={getBitcoinPrice.data}
      NetworkOverview={NetworkOverview}
      NetworkDiff={NetworkDiff}
      BlockReward={BlockReward}
    />
  );
}
