import NewsArticle from "@/components/Single/Post";
// import OpenAI from "openai";
// import Groq from "groq-sdk";
import * as cheerio from "cheerio";
import { parser } from "html-metadata-parser";
import { Metadata } from "next";

export default async function Page({
  params,
}: {
  params: { category: string; date: string; title: string };
}) {
  const query = await params;
  //console.log(query);
  const getPost = await fetch(
    `${
      process.env.NEXT_PUBLIC_backend_url
    }/wp-json/wp/v2/posts?acf_format=standard&slug=${query.title}&date=${
      query.date
    }&_=${Date.now()}`
  ).then((res) => res.json());

  let allTags = getPost[0].tags;
  // console.log(allTags);

  let RelatedPosts = [];
  let getRelatedPostItems = await Promise.all(
    allTags.map(async (i) => {
      // let getTagitem = await fetch(
      //   `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/tags/${i}`
      // ).then((res) => res.json());

      // let getRelatedPosts: [any] = await fetch(
      //   `${process.env.NEXT_PUBLIC_backend_url}/wp-json/ajax-search-pro/v0/search?s=${getTagitem.name}&id=3`
      // ).then((res) => res.json());
      let getRelatedPostsByTags: [any] = await fetch(
        `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/posts?tags=${i}&acf_format=standard`
      ).then((res) => res.json());
      // console.log(getTagitem, "tag item", getRelatedPostsByTags);

      RelatedPosts = [...getRelatedPostsByTags];
      return getRelatedPostsByTags;
    })
  );
  // const generateQuery = await fetch("/api/ai", {
  //   body: JSON.stringify({ headline: getPost[0].title.rendered }),
  //   method: "POST",
  // }).then((res) => res.json());
  // const groq = new Groq({ apiKey: process.env.GROQ_KEY });
  // const openai = new OpenAI({
  //   apiKey: process.env.OPENAI_KEY,
  //   organization: process.env.OPENAI_ORG,
  // });
  // try {
  //   let generateQuery = await openai.chat.completions.create({
  //     model: "gpt-4o-mini",
  //     messages: [
  //       {
  //         role: "system",
  //         content: `You are Search Assistant, Your Task is to find the company name from the Article Headline which will be used as Search Query, If there is no company then suggest short search query with same schema
  //      Use JSON \n The JSON object must use the schema: ${JSON.stringify({
  //        company: "string",
  //      })}  `,
  //       },
  //       {
  //         role: "user",
  //         content: `Here is the headline: ${getPost[0].title.rendered}`,
  //       },
  //     ],
  //   });

  //   // let generateQuery = await groq.chat.completions.create({
  //   //   response_format: { type: "json_object" },
  //   //   model: "mixtral-8x7b-32768",
  //   //   messages: [
  //   //     {
  //   //       role: "system",
  //   //       content: `You are Search Assistant, Your Task is to find the company name from the Article Headline which will be used as Search Query, If there is no company then suggest short search query with same schema
  //   //      Use JSON \n The JSON object must use the schema: ${JSON.stringify({
  //   //        company: "string",
  //   //      })}  `,
  //   //     },
  //   //     {
  //   //       role: "user",
  //   //       content: `Here is the headline: ${getPost[0].title.rendered}`,
  //   //     },
  //   //   ],
  //   // });
  //   let formattedQuery = JSON.parse(generateQuery.choices[0].message.content);
  //   let finalQuery = Object.values(formattedQuery).reduce((acc, val) => {
  //     return val + " " + acc;
  //   }, "");
  //   console.log(finalQuery, "final");

  //   let getRelatedPosts: [any] = await fetch(
  //     `${process.env.NEXT_PUBLIC_backend_url}/wp-json/ajax-search-pro/v0/search?s=${finalQuery}&id=3`
  //   ).then((res) => res.json());
  //   RelatedPosts = [...getRelatedPosts];
  // } catch (e) {
  //   console.log("Error generating Related Posts");
  // }
  // console.log("relatedss", RelatedPosts.length);
  if (!getPost.length) {
    return <div>Post not found</div>;
  } else {
    return (
      <NewsArticle
        post={getPost[0]}
        relatedPosts={RelatedPosts.slice(0, 6)}
        postQuery={query}
      />
    );
  }
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; date: string; title: string };
}): Metadata {
  const query = await params;

  let getInfoAboutPost = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/posts?acf_format=standard&slug=${query.title}&date=${query.date}`
  ).then((res) => res.json());

  let getRankMathInfo = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/rankmath/v1/getHead?url=${getInfoAboutPost[0].link}`
  ).then((res) => res.json());

  // console.log(getRankMathInfo, "rankmath", getRankMathInfo.head);
  let s = cheerio.load(getRankMathInfo.head);
  let metaDataToAdd = {};
  // let parsed = HTMLToJSON(getRankMathInfo.head);
  s("meta").each((i, el) => {
    if (el.attribs.property && el.attribs.property.includes("og")) {
      metaDataToAdd[el.attribs.property.split("og:")[1]] = el.attribs.content;
    }
  });
  // console.log(metaDataToAdd);
  let getTags = await Promise.all(
    getInfoAboutPost[0].tags.map(async (item) => {
      let getTagName = await fetch(
        `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/tags/${item}`
      ).then((res) => res.json());
      return getTagName.name;
    })
  );
  let metaTitle = metaDataToAdd?.title
    ? metaDataToAdd.title + "-By TheMinerMag"
    : getInfoAboutPost[0].title.rendered + "-By TheMinerMag";
  let metaDesc = metaDataToAdd?.description
    ? metaDataToAdd.description
    : getInfoAboutPost[0].excerpt.rendered;

  // let getMeta = await getMetaData(getInfoAboutPost[0].link);
  let getMeta = await parser(getInfoAboutPost[0].link);

  // console.log(getMeta, "getMetttt", Object.keys(getMeta));
  // console.log(getInfoAboutPost);
  return {
    title: getMeta.meta.title,
    description: getMeta.meta.description,
    openGraph: {
      title: getMeta.meta.title,
      description: getMeta.meta.description,
      siteName: "TheMinerMag",
      images: [getInfoAboutPost[0].acf.main_image],
      type: "article",
      publishedTime: new Date(getInfoAboutPost[0].date).toISOString(),
    },
    keywords: getTags,
    twitter: {
      card: "summary_large_image",
      title: getMeta.meta.title,
      description: getMeta.meta.description,
      images: [getInfoAboutPost[0].acf.main_image],
      creator: "@TheMinerMag_",
    },
  };
}
