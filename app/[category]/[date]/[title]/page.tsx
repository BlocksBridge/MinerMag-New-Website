import NewsArticle from "@/components/Single/Post";
import OpenAI from "openai";
import Groq from "groq-sdk";
import { Metadata } from "next";

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

  let allTags = getPost[0].tags;
  console.log(allTags);

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
  console.log("relatedss", RelatedPosts.length);
  if (!getPost.length) {
    return <div>Post not found</div>;
  } else {
    return (
      <NewsArticle post={getPost[0]} relatedPosts={RelatedPosts.slice(0, 6)} />
    );
  }
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; date: string; title: string };
}) {
  const query = await params;

  let getInfoAboutPost = await fetch(
    `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/posts?acf_format=standard&slug=${query.title}&date=${query.date}`
  ).then((res) => res.json());
  // console.log(getInfoAboutPost[0], "metadata");
  return {
    title: getInfoAboutPost[0].title.rendered + "- By TheMinerMag",
  };
}
