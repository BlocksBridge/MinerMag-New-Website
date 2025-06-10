import type { MetadataRoute } from "next";
import { generatePostsSitepmap } from "../lib/utils";
import { companies } from "./companiesData";
export default async function sitemap(): MetadataRoute.Sitemap {
  let getPosts = await generatePostsSitepmap();
  let filteredPosts = getPosts.filter((i: { link: string }) => {
    if (!i.link.includes("/data/")) {
      if (
        i.link.includes("/news/") ||
        i.link.includes("/research/") ||
        i.link.includes("/home/")
      ) {
        let newLink = i.link.replace("/home/", "/news/");
        return { ...i, link: newLink };
      }
    } else {
      return false;
    }
  });
  let staticPages = [
    {
      url: process.env.NEXT_PUBLIC_website_url!,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      priority: 0.6,
      changeFrequency: "yearly",
      url: process.env.NEXT_PUBLIC_website_url + "/privacy-policy",
    },
    {
      priority: 0.6,
      changeFrequency: "yearly",
      url: process.env.NEXT_PUBLIC_website_url + "/contact-us",
    },
  ];
  let postsForSitemap = filteredPosts.map((item) => {
    return {
      priority: 0.7,
      lastModified: new Date(item.modified).toISOString(),
      changeFrequency: "weekly",
      url: process.env.NEXT_PUBLIC_website_url + item.link.split(".com")[1],
    };
  });
  let companiesForSitemap = companies.map((item) => {
    return {
      priority: 0.8,
      changeFrequency: "hourly",
      url: process.env.NEXT_PUBLIC_website_url + "/company/" + item,
    };
  });

  return [...staticPages, ...postsForSitemap, ...companiesForSitemap];
}

export const revalidate = 86400;
