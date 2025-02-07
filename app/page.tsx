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

  const getNetworkOveriew = await fetch(
    "https://api.hashrateindex.com/v1/hashrateindex/network/overview",
    { headers: { "X-Hi-Api-Key": "hi.72efa27d0f82a2541260cfb351e3adc7" } }
  ).then((res) => res.json());
  const getBlockReward = await fetch(
    "https://api.hashrateindex.com/v1/hashrateindex/network/block-reward",
    { headers: { "X-Hi-Api-Key": "hi.72efa27d0f82a2541260cfb351e3adc7" } }
  ).then((res) => res.json());
  console.log(getBitcoinPrice.data[0], "btc");
  //console.log(Object.keys(getPosts[0]), getPosts[0]);
  return (
    <HomePage
      getPosts={getPosts}
      BitcoinData={getBitcoinPrice.data}
      NetworkOverview={getNetworkOveriew.data}
      BlockReward={getBlockReward.data}
    />
  );
}
