import NewsArticle from "@/components/Single/Post";

export default async function Page({
  params,
}: {
  params: { category: string; date: string; title: string };
}) {
  const query = await params;
  //console.log(query);
  const getPost = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/posts?acf_format=standard&slug=${query.title}&date=${query.date}`
  ).then((res) => res.json());
  let RelatedPosts: [any] = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/ajax-search-pro/v0/search?s=${getPost[0].title.rendered}`
  ).then((res) => res.json());
  console.log(getPost[0], "related");
  //console.log(getPost, Boolean(getPost.length));
  if (!getPost.length) {
    return <div>Post not found</div>;
  } else {
    return (
      <NewsArticle post={getPost[0]} relatedPosts={RelatedPosts.slice(0, 3)} />
    );
  }
}
