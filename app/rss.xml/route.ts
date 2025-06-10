// app/rss.xml/route.ts
import { generatePostsSitepmap } from "../../lib/utils";
import { unescape } from "html-escaper";
import * as cheerio from "cheerio";

function cleanHtmlDescription(html: string): string {
  // console.log("Original HTML input for cleaning:", html); // Debug: See raw input

  // 1. Unescape HTML entities (applying twice to catch double-encoded entities)
  let unescapedHtml = unescape(unescape(html));
  // console.log("After unescaping:", unescapedHtml); // Debug: See after unescape

  // Check if unescapedHtml is empty or just whitespace after unescaping
  if (!unescapedHtml.trim()) {
    // console.warn("Unescaped HTML is empty or just whitespace. Returning empty string.");
    return "";
  }

  // 2. Load the HTML with cheerio for robust parsing
  const $ = cheerio.load(unescapedHtml);

  // 3. Remove specific unwanted elements (e.g., TinyMCE bookmarks)
  // This targets spans with data-mce-type attribute and spans with the mce_SELRES_start class
  $('span[data-mce-type="bookmark"], .mce_SELRES_start').remove();
  // console.log("After removing specific spans:", $.html()); // Debug: See after span removal

  // 4. Remove 'style' attributes from all elements for leaner output
  $("*").removeAttr("style");
  // console.log("After removing style attributes:", $.html()); // Debug: See after attribute removal

  // 5. Extract the text content from the first <p> tag, or fallback to general text
  // This is a common pattern for WordPress excerpts which are often just a <p> tag.
  let cleanedContent = "";
  const firstParagraph = $("p").first();

  if (firstParagraph.length > 0) {
    // If a paragraph exists, get its HTML content (which might contain <a>, <strong> etc.)
    cleanedContent = firstParagraph.html() || "";
  } else {
    // Fallback: if no <p> tag, get the full text from the body
    cleanedContent = $("body").html() || "";
  }

  // Final trim and return
  return cleanedContent.trim();
}
export async function GET() {
  const timestamp = Date.now();
  let getPostsFromWordpress = await fetch(
    `${
      process.env.NEXT_PUBLIC_backend_url || "https://theminermag.com"
    }/wp-json/wp/v2/posts?per_page=35&timestamp=${timestamp}`
  ).then((res) => res.json());
  let filteredPosts = getPostsFromWordpress.filter((i: { link: string }) => {
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
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Your Website Name</title>
    <description>Your website description</description>
    <link>${process.env.NEXT_PUBLIC_website_url}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${
      process.env.NEXT_PUBLIC_website_url
    }/rss.xml" rel="self" type="application/rss+xml"/>
    
    ${filteredPosts
      .map(
        (post) => `
    <item>
     <title><![CDATA[${unescape(post.title.rendered)}]]></title>
      <description><![CDATA[${cleanHtmlDescription(
        post.excerpt.rendered
      )}]]></description>
      <link>${
        process.env.NEXT_PUBLIC_website_url + post.link.split(".com")[1]
      }</link>
      <guid isPermaLink="true">${
        process.env.NEXT_PUBLIC_website_url + post.link.split(".com")[1]
      }</guid>
      <pubDate>${new Date(
        post.modified || post.published || new Date()
      ).toUTCString()}</pubDate>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

// Optional: Add revalidation for dynamic updates
export const revalidate = 3600; // 1 hour
