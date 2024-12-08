import HomePage from "@/components/Home/Home";

export default async function Page() {
  const getPosts = await fetch(`https://theminermag.com/wp-json/wp/v2/posts`, {
    cache: "no-store",
    next: { tags: ["posts"] },
  }).then((res) => res.json());
  console.log(Object.keys(getPosts[0]), getPosts[0].acf);
  return <HomePage />;
}
