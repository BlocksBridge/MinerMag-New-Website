import Image from "next/image";
import Link from "next/link";
export default async function TopHeader() {
  const getLeaderBoard = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/leaderboard?acf_format=standard`
  ).then((res) => res.json());

  const checkHeaderAd = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/ad-banners/v1/header-top-banner`
  ).then((res) => res.json());
  console.log(
    checkHeaderAd,
    checkHeaderAd.html.split("src=")[1].split('"')[1].split(".com")[1]
  );
  return (
    <div className="w-11/12 md:w-10/12 mx-auto flex justify-center items-center bg-white p-4 rounded-lg ">
      {checkHeaderAd?.html ? (
        <Link
          href={checkHeaderAd.html.split('href="')[1].split(`"`)[0]}
          target="_blank">
          <Image
            alt="Ad Banner"
            src={`${process.env.NEXT_PUBLIC_backend_url}/${
              checkHeaderAd.html.split("src=")[1].split('"')[1].split(".com")[1]
            }`}
            width={728}
            height={90}
          />
        </Link>
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
