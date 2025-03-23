import Image from "next/image";
import Link from "next/link";
export default async function TopHeader() {
  const getLeaderBoard = await fetch(
    `${
      process.env.NEXT_PUBLIC_backend_url
    }/wp-json/wp/v2/leaderboard?acf_format=standard?_=${Date.now()}`
  ).then((res) => res.json());

  const checkHeaderAd = await fetch(
    `${
      process.env.NEXT_PUBLIC_backend_url
    }/wp-json/ad-banners/v1/header-top-banner?_=${Date.now()}`
  ).then((res) => res.json());
  // console.log(
  //   checkHeaderAd,
  //   "header ad",
  //   new URL(checkHeaderAd.html.split("src=")[1].split('"')[1]).pathname
  // );
  return (
    <div className="w-11/12 md:w-10/12 mx-auto flex justify-center items-center bg-white p-4 rounded-lg ">
      {checkHeaderAd?.html ? (
        <Link
          href={checkHeaderAd.html.split('href="')[1].split(`"`)[0]}
          target="_blank">
          <Image
            alt="Banner"
            src={`${process.env.NEXT_PUBLIC_backend_url}${
              new URL(checkHeaderAd.html.split("src=")[1].split('"')[1])
                .pathname
            }`}
            width={728}
            height={90}
          />
        </Link>
      ) : (
        <Link href={"https://blocksbridge.com"} target="_blank">
          <Image
            src={getLeaderBoard[0].acf.banner}
            alt="Banner"
            width={728}
            height={90}
          />
        </Link>
      )}
    </div>
  );
}
