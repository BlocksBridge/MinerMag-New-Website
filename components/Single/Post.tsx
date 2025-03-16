// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Facebook, Linkedin, Search, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NewsArticle({ post, relatedPosts }) {
  // console.log(relatedPosts, "redlatwe");
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 py-8">
          <h1
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            className="text-3xl font-bold mb-2"></h1>
          <div className="text-sm text-gray-500 mb-6">
            {" "}
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <Image
            src={post.acf.main_image}
            alt="Bitcoin mining facility in Iowa"
            width={800}
            height={400}
            className="w-full h-auto rounded-lg mb-6"
          />

          <div
            className="prose max-w-none mb-12 flex-col flex gap-y-7"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>

          <div className="flex gap-4 mb-12">
            <button
              variant="outline"
              size="icon"
              aria-label="Share on Facebook">
              <Facebook className="h-4 w-4" />
            </button>
            <button variant="outline" size="icon" aria-label="Share on Twitter">
              <Twitter className="h-4 w-4" />
            </button>
            <button
              variant="outline"
              size="icon"
              aria-label="Share on LinkedIn">
              <Linkedin className="h-4 w-4" />
            </button>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Get Weekly Mining Insights by Email
            </h2>
            <Link
              href={"https://substack.com/@blocksbridge"}
              target="_blank"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Subscribe to Miner Weekly newsletter
            </Link>
          </section>
        </article>

        {/* Latest News Section */}
        <div className="max-w-7xl mx-auto px-4 py-8 border-t">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">LATEST</h2>
            <Link href="/news" className="text-blue-600 hover:underline">
              MORE
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.length &&
              relatedPosts.map(async (localPost, index) => {
                if (localPost.post_title == post.title.rendered) {
                  return null;
                }
                // let getImage = await fetch(
                //   `${process.env.NEXT_PUBLIC_backend_url}/wp-json/wp/v2/posts/${localPost.ID}?acf_format=standard`
                // ).then((res) => res.json());
                return (
                  <Link
                    key={localPost.ID}
                    href={`${localPost.link.split(".com")[1]}`}
                    className="group">
                    <Image
                      src={localPost.acf.main_image}
                      alt={`Latest news ${localPost.title.rendered}`}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-medium group-hover:text-blue-600">
                      {localPost.title.rendered}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {/* {localPost.post_modified.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })} */}
                    </p>
                  </Link>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
}
