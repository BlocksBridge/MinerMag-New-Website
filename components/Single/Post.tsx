// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Facebook, Linkedin, Search, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NewsArticle({ post }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">{post.title.rendered}</h1>
          <div className="text-sm text-gray-500 mb-6">{post.date}</div>

          <Image
            src={post.acf.main_image}
            alt="Bitcoin mining facility in Iowa"
            width={800}
            height={400}
            className="w-full h-auto rounded-lg mb-6"
          />

          <div
            className="prose max-w-none mb-12"
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
              Subscribe to Our Newsletter
            </h2>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
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
            {[1, 2, 3].map((i) => (
              <Link key={i} href="#" className="group">
                {/* <Image
                  src={`https://sjc.microlink.io/Iz0t8yZa6uZKG4JvmMRI1csrWcWhLbtEufg59sQu0bdc0mVXsiLurAon24cRp2rJlRuOGJat_PHjEJ9EsXqOPQ.jpeg`}
                  alt={`Latest news ${i}`}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                /> */}
                <h3 className="font-medium group-hover:text-blue-600">
                  Mining Operation Expands Renewable Energy Usage
                </h3>
                <p className="text-sm text-gray-500">November {15 + i}, 2024</p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">About Us</h3>
              <p className="text-sm text-gray-600">
                TheMinerMag provides the latest news and insights in the
                cryptocurrency mining industry.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/news" className="hover:text-blue-600">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="/data" className="hover:text-blue-600">
                    Data
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-blue-600">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <button variant="ghost" size="icon">
                  <Twitter className="h-4 w-4" />
                </button>
                <button variant="ghost" size="icon">
                  <Linkedin className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow"
                />
                <button type="submit">Sign Up</button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
            © 2024 TheMinerMag. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
