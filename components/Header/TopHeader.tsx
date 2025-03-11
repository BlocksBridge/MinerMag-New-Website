import Image from "next/image";
export default async function TopHeader() {
  const getLeaderBoard = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/leaderboard?acf_format=standard`
  ).then((res) => res.json());

  const checkHeaderAd = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/ad-banners/v1/header-top-banner`
  ).then((res) => res.json());

  return (
    <div className="w-10/12 md:w-6/12 mx-auto bg-white p-4 rounded-lg ">
      {checkHeaderAd?.html ? (
        <div>
          <Image
            alt="Ad Banner"
            src={checkHeaderAd.html.split("src=")[1].split('"')[1]}
            width={728}
            height={90}
          />
        </div>
      ) : (
        <Image
          src={getLeaderBoard[0].acf.banner}
          alt="Banner"
          width={400}
          height={400}
          className="w-full h-auto"
        />
      )}
    </div>
  );
}
