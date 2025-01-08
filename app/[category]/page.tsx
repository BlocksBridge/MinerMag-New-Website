import { redirect } from "next/navigation";
import Image from "next/image";
import SinglePostCard from "@/components/Category/SinglePostCard";
import Link from "next/link";
export default async function Category({
  searchParams,
  params,
}: {
  searchParams: { page: number };
  params: { category: string };
}) {
  const pageQuery = await searchParams;
  const category = await params;
  const checkCategory: [SingleCategory] = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/categories?slug=${category.category}`
  ).then((res) => res.json());

  if (checkCategory.length) {
    console.log(checkCategory);
    const getPostsByCategory = await fetch(
      `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/posts?categories=${
        checkCategory[0].id
      }&per_page=12&${
        pageQuery.page && `page=${pageQuery.page}`
      }&order=desc&orderby=date&acf_format=standard`
    ).then((res) => res.json());

    console.log(getPostsByCategory, getPostsByCategory.length);
    if (getPostsByCategory.code) {
      redirect("/404");
    } else {
      console.log(process.env.NEXT_PUBLIC_backend_url);

      return (
        <div className="flex flex-col w-5/6 m-auto items-center justify-center my-10">
          <h1 className="text-3xl font-bold mb-8">{checkCategory[0].name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getPostsByCategory.map((article) => (
              <SinglePostCard
                article={article}
                key={article.id}
                category={category.category}
              />
            ))}
          </div>
          <div className="flex justify-center gap-5 mt-10">
            {" "}
            <Link
              href={`${category.category}?page=${
                pageQuery.page && Number(pageQuery.page) !== 1
                  ? Number(pageQuery.page) - 1
                  : 1
              }`}
              className="bg-blue-600 font-bold px-3 py-2 rounded-md text-white">
              Prev
            </Link>
            <Link
              href={`${category.category}?page=${
                pageQuery.page ? Number(pageQuery.page) + 1 : 2
              }`}
              className="bg-blue-600 font-bold px-3 py-2 rounded-md text-white">
              Next
            </Link>
          </div>
        </div>
      );
    }
  } else {
    redirect("/404");
  }
}

export interface SingleCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: any[];
  acf: any[];
  _links: Links;
}

export interface Links {
  self: Self[];
  collection: Collection[];
  about: About[];
  "wp:post_type": WpPostType[];
  curies: Cury[];
}

export interface Self {
  href: string;
  targetHints: TargetHints;
}

export interface TargetHints {
  allow: string[];
}

export interface Collection {
  href: string;
}

export interface About {
  href: string;
}

export interface WpPostType {
  href: string;
}

export interface Cury {
  name: string;
  href: string;
  templated: boolean;
}
