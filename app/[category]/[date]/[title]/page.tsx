import NewsArticle from "@/components/Single/Post";

export default async function Page({
  params,
}: {
  params: { category: string; date: string; title: string };
}) {
  const query = await params;
  //console.log(query);
  const getPost = await fetch(
    `${process.env.backend_url}/wp-json/wp/v2/posts?acf_format=standard&slug=${query.title}&date=${query.date}`
  ).then((res) => res.json());
  console.log(getPost[0]);
  //console.log(getPost, Boolean(getPost.length));
  if (!getPost.length) {
    return <div>Post not found</div>;
  } else {
    return <NewsArticle post={getPost[0]} />;
  }
}
