import HomePage from "@/components/Home/Home";

export default async function Page() {
  const getPosts: [any] = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/posts?acf_format=standard`,
    {
      cache: "no-store",
      next: { tags: ["posts"] },
    }
  ).then((res) => res.json());
  //console.log(Object.keys(getPosts[0]), getPosts[0]);
  return <HomePage getPosts={getPosts} />;
}
