import { redirect } from "next/navigation";
import Image from "next/image";
import SinglePostCard from "@/components/Category/SinglePostCard";
import Link from "next/link";
export default async function Category({
  searchParams,
  params,
}: {
  searchParams: { page: number };
  params: { company: string };
}) {
  const pageQuery = await searchParams;
  const compan = await params;
  const checkTag: [SingleCategory] = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/tags?slug=${compan.company}`
  ).then((res) => res.json());

  if (checkTag.length) {
    console.log(checkTag);
    const getPostsByTags = await fetch(
      `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/posts?tags=${
        checkTag[0].id
      }&per_page=12&${
        pageQuery.page && `page=${pageQuery.page}`
      }&order=desc&orderby=date&acf_format=standard`
    ).then((res) => res.json());

    console.log(getPostsByTags, getPostsByTags.length);
    if (getPostsByTags.code) {
      redirect("/404");
    } else {
      let checkIfNextPageExists = await PaginationProtection(
        Number(pageQuery.page) + 1,
        checkTag[0].id
      );
      return (
        <div className="flex flex-col w-5/6 m-auto items-center justify-center my-10">
          {" "}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center"></div>
            <Link
              href={`${
                process.env.NEXT_PUBLIC_website_url
              }/company/${compan.company.toUpperCase()}`}
              className="text-sm text-blue-600 hover:underline">
              Back to {compan.company}
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-8">{checkTag[0].name} News</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getPostsByTags.map((article) => (
              <SinglePostCard
                article={article}
                key={article.id}
                category={compan.company}
              />
            ))}
          </div>
          <div className="flex justify-center gap-5 mt-10">
            {" "}
            <Link
              href={`/company/${compan.company}/news?page=${
                pageQuery.page && Number(pageQuery.page) !== 1
                  ? Number(pageQuery.page) - 1
                  : 1
              }`}
              className="bg-blue-600 font-bold px-3 py-2 rounded-md text-white">
              Prev
            </Link>
            {checkIfNextPageExists && (
              <Link
                href={`/company/${compan.company}/news?page=${
                  pageQuery.page ? Number(pageQuery.page) + 1 : 2
                }`}
                className="bg-blue-600 font-bold px-3 py-2 rounded-md text-white">
                Next
              </Link>
            )}
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

async function PaginationProtection(nextPage, categoryId) {
  const checkNextPage = await fetch(
    `${
      process.env.NEXT_PUBLIC_backend_url
    }/wp-json/wp/v2/posts?categories=${categoryId}&per_page=12&${`page=${
      nextPage ? nextPage : 1
    }`}&order=desc&orderby=date&acf_format=standard`
  ).then((res) => res.json());
  console.log(checkNextPage);
  if (checkNextPage.code) {
    return false;
  } else {
    return true;
  }
}
